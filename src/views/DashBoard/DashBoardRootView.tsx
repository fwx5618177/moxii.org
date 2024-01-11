"use client";

import ArticleInfoCard from "@/components/ArticleInfoCard";
import CalendarHeatMap from "@/components/CalendarHeatMapCard";
import { useLocalPostList } from "@/services/Local/hooks";
import { useMemo } from "react";

const DashBoardRootView = () => {
  const { data } = useLocalPostList();
  const { latestLastPublished, uniqueTypes, totalCount } = useMemo(() => {
    const typesSet: Set<string> = new Set();
    let latestDate = { date: new Date(0), name: "", slug: "" };

    data?.forEach((item) => {
      // 更新去重后的type集合
      if (item?.type) {
        typesSet.add(item.type);
      }

      // 查找最新的lastPublished日期
      const itemDate = new Date(item?.updatedDate);
      if (itemDate > latestDate?.date) {
        latestDate = {
          date: itemDate,
          name: item?.title,
          slug: item?.slug,
        };
      }
    });

    return {
      latestLastPublished: latestDate,
      uniqueTypes: Array.from(typesSet),
      totalCount: data?.length || 0,
    };
  }, [data]);

  return (
    <div>
      <ArticleInfoCard
        title="文章"
        articleCount={totalCount}
        lastPublished={latestLastPublished}
        typeCount={uniqueTypes}
      />

      <CalendarHeatMap />
    </div>
  );
};

export default DashBoardRootView;
