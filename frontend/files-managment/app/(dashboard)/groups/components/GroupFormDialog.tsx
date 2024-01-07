"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { CreateGroupDto, UpdateGroupDto } from "@/core/services/group.service";
import { createGroup, updateGroup } from "@/core/actions/group.actions";
import { Group } from "@/core/models/Group.model";

function GroupFormDialog({
  group,
  isModalVisible,
  setIsModalVisible,
}: {
  group?: Group;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
}) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: UpdateGroupDto | CreateGroupDto) => {
    if (group) {
      await updateGroup(group.id, values);
    } else {
      await createGroup(values as CreateGroupDto);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (group) {
      form.setFieldsValue({
        name: group.name,
        description: group.description,
      });
    } else {
      form.resetFields();
    }
  }, [group, form]);

  return (
    <Modal
      title={group ? "Update Group" : "Create Group"}
      open={isModalVisible}
      onOk={form.submit}
      onCancel={() => setIsModalVisible(false)}
      centered
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          name: group?.name,
          description: group?.description,
        }}
      >
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
