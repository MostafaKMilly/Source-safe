import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import "./layout.css";
import Breadcrumbs from "./components/Breadcrumbs";
import Sidebar from "./components/Sidebar";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Menu from "antd/es/menu";
import Avatar from "antd/es/avatar/avatar";
import { getUserProfile, logoutUser } from "@/core/actions/users.actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserMenu from "./components/UserMenu";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getUserProfile();

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
        <div style={{ width: "162px" }}>
          <UserMenu logout={logoutUser} username={currentUser.username} />
        </div>
      </Header>
      <Layout style={{ flexDirection: "row" }}>
        <Sidebar />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumbs />
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
