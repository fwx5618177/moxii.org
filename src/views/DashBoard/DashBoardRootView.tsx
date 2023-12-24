"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "antd";

const DashBoardRootView = () => {
  const { logout } = useAuthContext();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default DashBoardRootView;
