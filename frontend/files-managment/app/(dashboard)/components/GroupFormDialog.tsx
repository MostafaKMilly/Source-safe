"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Form, Input } from "antd";
import { CreateGroupDto, UpdateGroupDto } from "@/core/services/group.service";
import { createGroup, updateGroup } from "@/core/actions/group.actions";

function GroupFormDialog({
  groupId,
  isModalVisible,
  setIsModalVisible,
}: {
  groupId?: number;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
}) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: UpdateGroupDto | CreateGroupDto) => {
    if (groupId) {
      await updateGroup(groupId, values);
    } else {
      // Create new group
      await createGroup(values as CreateGroupDto);
    }
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={groupId ? "Update Group" : "Create Group"}
      open={isModalVisible}
      onOk={form.submit}
      onCancel={() => setIsModalVisible(false)}
      centered
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Group Name"
          rules={[{ required: true, message: "Please input the group name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the group name!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default GroupFormDialog;
