"use client";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import GroupsFilterButton from "./GroupsFilterButton";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GroupFormDialog from "./GroupFormDialog";

function GroupsToolbar() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div style={{ display: "flex", columnGap: "8px" }}>
      <Search
        placeholder="Search groups"
        style={{ marginBottom: "20px", width: 300 }}
      />
      <GroupsFilterButton />
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{
          height: 42,
        }}
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Add
      </Button>
      <GroupFormDialog
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
}

export default GroupsToolbar;
