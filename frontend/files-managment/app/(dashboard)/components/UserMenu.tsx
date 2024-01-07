"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import React from "react";

function UserMenu({
  username,
  logout,
}: {
  username: string;
  logout: () => void;
}) {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      disabledOverflow
      items={[
        {
          label: username,
          key: "SubMenu",
          icon: (
            <Avatar
              style={{
                backgroundColor: "#87d068",
                justifyContent: "center",
              }}
              icon={<UserOutlined />}
            />
          ),
          children: [
            {
              label: "Profile",
              key: "profile",
            },
            {
              label: "Logout",
              key: "logout",
              onClick: () => logout(),
            },
          ],
        },
      ]}
    />
  );
}

export default UserMenu;
