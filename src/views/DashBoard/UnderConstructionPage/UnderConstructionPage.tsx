import React, { useEffect, useState } from "react";

const UnderConstructionPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  // 设置延迟显示动画
  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(true);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-3xl font-bold text-[#fff]">
        抱歉，该页面正在开发中...
      </div>
      {isAnimated && (
        <div className="mt-5 cursor-pointer animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="#fff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default UnderConstructionPage;
