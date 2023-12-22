"use client";

import useAuth from "@/hooks/useAuth";

const DashBoardView = () => {
  useAuth();

  return <div>dashboard</div>;
};

export default DashBoardView;
