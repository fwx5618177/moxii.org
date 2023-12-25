"use client";

import { DashboardLayoutProps } from "Components";
import React, { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Breadcrumb } from "antd";
import { SideItem } from "@/settings/side.config";
import { useAuthContext } from "@/contexts/AuthContext";

const { Header, Sider, Content } = Layout;

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const uriParams = usePathname();
  const { logout } = useAuthContext();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={SideItem}
          selectedKeys={[uriParams?.split("/")?.pop()]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer, display: "flex" }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              type="primary"
              onClick={logout}
              style={{
                marginRight: 12,
              }}
            >
              Logout
            </Button>
          </div>
        </Header>

        {uriParams && (
          <Breadcrumb style={{ margin: 16 }}>
            {uriParams?.split("/")?.map((item, index) => {
              if (!!item)
                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
        )}

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
