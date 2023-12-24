import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import Nav1 from "@/views/DashBoard/Nav1";
import DashBoardRootView from "@/views/DashBoard/DashBoardRootView";

export const defaultSelectedKeys = ["1"];

export const SideItem: Array<
  ItemType<MenuItemType> & {
    component: any;
  }
> = [
  {
    key: "default",
    icon: <UserOutlined />,
    label: <Link href="/dashboard">Dashboard</Link>,
    component: DashBoardRootView,
  },
  {
    key: "navtest",
    icon: <UserOutlined />,
    label: <Link href="/dashboard/navtest">nav 1</Link>,
    component: Nav1,
  },
];

export const DefaultItem = DashBoardRootView;
