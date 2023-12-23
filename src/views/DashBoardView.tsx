"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "antd";
import { useEffect } from "react";

const DashBoardView = () => {
  // TODO: remove it from deprecated hook
  // useAuth();
  const { isLoggedIn, logout } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) logout();
  }, [isLoggedIn, logout]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default DashBoardView;
