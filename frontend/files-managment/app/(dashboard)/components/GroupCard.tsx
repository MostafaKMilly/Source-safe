"use client";
import { Group } from "@/core/models/Group.model";
import { EllipsisOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import GroupFormDialog from "./GroupFormDialog";
import moment from "moment";

function GroupCard({ group }: { group: Group }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="1">Join</Menu.Item>
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
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button shape="circle" icon={<EllipsisOutlined />} />
        </Dropdown>
      }
    >
      <p>
        Creation Date:{" "}
        {moment(group.createdAt).format("YYYY-MM-DD HH:mm")}
      </p>
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
