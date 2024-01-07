"use client";
import { deleteGroup, leaveGroup } from "@/core/actions/group.actions";
import { Group } from "@/core/models/Group.model";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal } from "antd";
import React, { useState } from "react";
import GroupFormDialog from "./GroupFormDialog";
import { UserSelectDialog } from "./UserSelectDialog";
import { User } from "@/core/models/User.model";

function GroupCardDropwonMenu({
  isOwner,
  group,
  users,
}: {
  isOwner: boolean;
  group: Group;
  users: User[];
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserSelectVisible, setIsUserSelectVisible] = useState(false);

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this group?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteGroup(group.id);
      },
    });
  };

  const showLeaveConfirm = () => {
    Modal.confirm({
      title: "Are you sure leave this group?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        leaveGroup(group.id);
      },
    });
  };

  const ownerMenu = (
    <Menu>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={showDeleteConfirm}
      >
        Delete
      </Menu.Item>
      <Menu.Item
        key="addUsers"
        icon={<UserAddOutlined />}
        onClick={() => setIsUserSelectVisible(true)}
      >
        Add Users
      </Menu.Item>
      <Menu.Item
        key="editGroup"
        icon={<EditOutlined />}
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Edit Group
      </Menu.Item>
    </Menu>
  );

  const memberMenu = (
    <Menu>
      <Menu.Item
        key="leave"
        icon={<LogoutOutlined />}
        onClick={showLeaveConfirm}
      >
        Leave
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={isOwner ? ownerMenu : memberMenu} trigger={["click"]}>
        <Button shape="circle" icon={<EllipsisOutlined />} />
      </Dropdown>
      <GroupFormDialog
        group={group}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <UserSelectDialog
        group={group}
        setVisible={setIsUserSelectVisible}
        users={users}
        visible={isUserSelectVisible}
      />
    </>
  );
}

export default GroupCardDropwonMenu;
