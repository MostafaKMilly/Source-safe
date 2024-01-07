"use client";
import { Group } from "@/core/models/Group.model";
import {
  EllipsisOutlined,
  FolderOpenOutlined,
  DeleteOutlined,
  UserAddOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Card, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import GroupFormDialog from "./GroupFormDialog";
import moment from "moment";

function GroupCard({ group, isOwner }: { group: Group; isOwner: boolean }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ownerMenu = (
    <Menu>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
      <Menu.Item key="addUsers" icon={<UserAddOutlined />}>
        Add Users
      </Menu.Item>
      <Menu.Item key="editGroup" icon={<EditOutlined />}>
        Edit Group
      </Menu.Item>
    </Menu>
  );

  const memberMenu = (
    <Menu>
      <Menu.Item key="leave" icon={<LogoutOutlined />}>
        Leave
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      cover={
        <FolderOpenOutlined
          style={{
            fontSize: "64px",
            color: "#8CCA6E",
            padding: "20px",
          }}
        />
      }
      title={group.name}
      extra={
        <Dropdown
          overlay={isOwner ? ownerMenu : memberMenu}
          trigger={["click"]}
        >
          <Button shape="circle" icon={<EllipsisOutlined />} />
        </Dropdown>
      }
    >
      <p>Creation Date: {moment(group.createdAt).format("YYYY-MM-DD HH:mm")}</p>
      <p>{group.description}</p>
      <GroupFormDialog
        groupId={group.id}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Card>
  );
}

export default GroupCard;
