import React from "react";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { FileOutlined } from "@ant-design/icons";
import "./layout.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <FileOutlined style={{ fontSize: "20px", color: "white" }} />
          <span
            style={{ marginLeft: "10px", color: "white", fontWeight: "600" }}
          >
            Source safe
          </span>
        </div>
      </Header>
      <Content className="content">
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer className="footer">©2024 Source safe</Footer>
    </Layout>
  );
}
