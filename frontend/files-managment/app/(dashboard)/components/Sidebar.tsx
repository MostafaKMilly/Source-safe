"use client";
import { FileOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
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
  );
}

export default Sidebar;
