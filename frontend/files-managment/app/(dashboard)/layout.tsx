"use client";
import { Layout, Menu, Breadcrumb, Avatar } from "antd";
import {
    UserOutlined, LockOutlined,
    FolderOpenOutlined,
    FileOutlined
} from "@ant-design/icons";
import React, { useState } from "react";
import "./layout.css";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState(["Home", "Groups"]);

  return (
    <Layout style={{ height: "100%" }}>
      <Header
        className="header"
        style={{
          background: "rgba(0, 0, 0, 0.88) !important",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <LockOutlined style={{ fontSize: "20px", color: "white" }} />
          <span
            style={{ marginLeft: "10px", color: "white", fontWeight: "600" }}
          >
            Source Safe
          </span>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          style={{ background: "transparent !important" }}
        >
          <SubMenu
            style={{ background: "transparent !important" }}
            key="userMenu"
            icon={
              <Avatar
                style={{ backgroundColor: "#87d068", justifyContent: "center" }}
                icon={<UserOutlined />}
              />
            }
            title="User Name"
          >
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="logout">Logout</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{ background: "white" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<FolderOpenOutlined />}>
              Groups
            </Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumb.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center", paddingTop: 0 }}>
        ©2024 Source Safe
      </Footer>
    </Layout>
  );
}
