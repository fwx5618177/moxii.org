import { ComponentMap, MenuProps } from "Components";
import dynamic from "next/dynamic";
import React from "react";

export const routes: ComponentMap = {
  home: dynamic(() => import("@/views/DashBoard/DashBoardRootView")),
};

export const dynamicRoutes = (key: string) => {
  if (key in routes) return routes[key];

  return dynamic(
    () =>
      import("@/views/DashBoard/UnderConstructionPage/UnderConstructionPage")
  );
};

export const filterRoutes = (
  permission: string,
  items: MenuProps[],
  forbiddenKeys: string[] = []
): MenuProps[] => {
  if (permission === "SALE") {
    return items.map((item) => {
      if (item.items) {
        item.items = item.items.filter(
          (subItem) => !forbiddenKeys.includes(subItem.key)
        );
      }
      return item;
    });
  }
  return items;
};
