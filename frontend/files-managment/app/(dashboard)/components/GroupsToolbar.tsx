"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import GroupsFilterButton from "./GroupsFilterButton";
import GroupFormDialog from "./GroupFormDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function GroupsToolbar() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleFilterChange = (
    filter: string,
    value: boolean | string | number | undefined
  ) => {
    const currentQueryParams = new URLSearchParams(searchParams);

    if (value) {
      currentQueryParams.set(filter, String(value));
    } else {
      currentQueryParams.delete(filter);
    }

    router.replace(pathname + "?" + currentQueryParams.toString());
  };

  return (
    <div style={{ display: "flex", columnGap: "8px" }}>
      <Search
        placeholder="Search groups"
        style={{ marginBottom: "20px", width: 300 }}
        onSearch={(value) => {
          handleFilterChange("name", value);
        }}
        onChange={(e) => {
          if (!e.target.value) {
            handleFilterChange("name", e.target.value);
          }
        }}
      />
      <GroupsFilterButton
        onFilterChange={(value) => {
          handleFilterChange("showOwnerGroups", value);
        }}
      />
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{ height: 42 }}
        onClick={() => setIsModalVisible(true)}
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
