import { DefaultItem, SideItem } from "./side.config";

export const getDashboardComponent = (key: string) => {
  const item = SideItem.find((item) => item.key === key);
  return item ? item.component : DefaultItem;
};
