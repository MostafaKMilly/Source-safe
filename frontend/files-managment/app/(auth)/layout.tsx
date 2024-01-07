import React from "react";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { LockOutlined } from "@ant-design/icons";
import "./layout.css";
import { getUserProfile } from "@/core/actions/users.actions";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: LayoutProps) {
  let isUserSignIn = false;
  try {
    const userProfile = await getUserProfile();
    if (userProfile.id) {
      isUserSignIn = true;
    }
  } catch (err) {
    if (!isRedirectError(err)) {
      console.log(err);
    }
  }

  if (isUserSignIn) {
    redirect("/");
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <LockOutlined style={{ fontSize: "20px", color: "white" }} />
          <span
            style={{ marginLeft: "10px", color: "white", fontWeight: "600" }}
          >
            Source Safe
          </span>
        </div>
      </Header>
      <Content className="content">
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer className="footer">©2024 Source Safe</Footer>
    </Layout>
  );
}
