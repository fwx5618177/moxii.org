"use client";

import ArticleInfoCard from "@/components/ArticleInfoCard";
import { Row, Col, Card } from "antd";
import { useState } from "react";

const DashBoardRootView = () => {
  const [loading, isLoading] = useState<boolean>(false);

  return (
    <div>
      <ArticleInfoCard
        articleCount={320}
        lastPublished={new Date()}
        authorCount={5}
      />
    </div>
  );
};

export default DashBoardRootView;
