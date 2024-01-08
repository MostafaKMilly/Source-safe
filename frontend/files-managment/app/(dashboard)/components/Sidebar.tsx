"use client";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

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
          onClick={() => {
            router.push("/groups");
          }}
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
          onClick={() => {
            router.push("/history");
          }}
          key="2"
          icon={
            <FontAwesomeIcon
              icon={faHistory}
              style={{
                width: "15px",
                margin: "0 auto",
              }}
            />
          }
        >
          History
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
