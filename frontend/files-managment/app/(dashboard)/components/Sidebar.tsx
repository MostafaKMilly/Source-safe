"use client";
import { FileOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

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
        <Menu.Item
          key="1"
          icon={
            <FontAwesomeIcon
              icon={faUserGroup}
              style={{
                width: "15px",
                margin: "0 auto",
              }}
            />
          }
        >
          Groups
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={
            <FontAwesomeIcon
              icon={faFolder}
              style={{
                width: "15px",
                margin: "0 auto",
              }}
            />
          }
        >
          Files
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
