"use client";

import { useLoginDashboard } from "@/services/Login/hooks";
import { LoginRequest } from "Components";
import { LoginResponse } from "Response";
import { useCallback, useEffect, useState, useRef } from "react";

const useLogin = () => {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token");
    }
    return null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const hasCheckedToken = useRef(false);
  const { mutate: loginDashboard } = useLoginDashboard<
    LoginResponse,
    LoginRequest
  >();

  const login = useCallback(
    async (credentials: LoginRequest, rememberMe: boolean) => {
      loginDashboard(credentials, {
        onSuccess: (data) => {
          setToken(data?.token);
          setIsLoggedIn(true);

          if (rememberMe) {
            window.localStorage.setItem("token", data?.token);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
    },
    [loginDashboard]
  );

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }
  }, []);

  const checkAuth = useCallback(async () => {
    if (!token || hasCheckedToken.current) return;

    hasCheckedToken.current = true;
    try {
      const response = await fetch("/api/login", {
        cache: "no-store",
        method: "GET",
        mode: "same-origin",
        next: {
          tags: ["token_tags"],
        },
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) throw new Error("Invalid token");
    } catch (error) {
      console.error("Auth check failed:", error);

      logout();
    }
  }, [logout, token]);

  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [logout, checkAuth, token]);

  return { login, logout, token, isLoggedIn };
};

export default useLogin;
