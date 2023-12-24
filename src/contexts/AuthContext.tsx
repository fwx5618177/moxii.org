"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { message } from "antd";
import { useLoginDashboard } from "@/services/Login/hooks";
import { LoginRequest } from "Components";
import { LoginResponse } from "Response";

const AuthContext = createContext(null);

export const useAuthContext = () =>
  useContext<{
    isLoggedIn: boolean;
    login: (credentials: LoginRequest) => void;
    logout: () => void;
    token: string;
  }>(AuthContext);

export const AuthProvider = ({ children }) => {
  const params = usePathname();
  const router = useRouter();
  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? window.localStorage.getItem("token") : null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const { mutate: loginDashboard } = useLoginDashboard<
    LoginResponse,
    LoginRequest
  >();

  const login = useCallback(
    async (credentials: LoginRequest) => {
      loginDashboard(credentials, {
        onSuccess: (data) => {
          setToken(data?.token);
          setIsLoggedIn(true);
          window.localStorage.setItem("token", data?.token);

          router.push("/dashboard");
        },
        onError: (error: any) => {
          console.log(error);
          message.error("登录失败:" + error?.message);
        },
      });
    },
    [loginDashboard, router]
  );

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    window.localStorage.removeItem("token");

    router.push("/login");
  }, [router]);

  const checkAuth = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch("/api/login", {
        cache: "no-store",
        method: "GET",
        mode: "same-origin",
        headers: { Authorization: token },
        next: {
          tags: ["token_tags"],
        },
      });
      if (!response.ok) throw new Error("Invalid token");

      const result = await response.json();
      if (result.code === "401") throw new Error("Invalid token");
    } catch (error) {
      console.error("Auth check failed:", error);
      message.error("登录失效，请重新登录");
      logout();
    }
  }, [token, logout]);

  // 检查认证状态
  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token, logout, checkAuth]);

  // 检查认证状态
  useEffect(() => {
    if (!isLoggedIn && params === "/dashboard") {
      router.push("/login");
    } else if (isLoggedIn && params === "/login") {
      router.push("/dashboard");
    }
  }, [isLoggedIn, params, router, token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
