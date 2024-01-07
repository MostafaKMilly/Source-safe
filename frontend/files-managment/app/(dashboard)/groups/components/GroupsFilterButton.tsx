import React, { useState } from "react";
import { Button, Menu, Checkbox, Dropdown } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface GroupsFilterButtonProps {
  onFilterChange: (showOwnerGroups: boolean) => void;
}

const GroupsFilterButton: React.FC<GroupsFilterButtonProps> = ({
  onFilterChange,
}) => {
  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    e.stopPropagation();
    onFilterChange(e.target.checked);
  };

  return (
    <Dropdown
      placement="bottomRight"
      trigger={["click"]}
      menu={{
        items: [
          {
            key: "0",
            label: (
              <Checkbox onChange={onCheckboxChange}>Created by me</Checkbox>
            ),
          },
        ],
      }}
    >
      <Button icon={<FilterOutlined />} style={{ height: 42 }} />
    </Dropdown>
  );
};

export default GroupsFilterButton;
