"use client";
import React, { useState } from "react";
import { Button, Menu, Checkbox, Dropdown } from "antd";
import { FilterOutlined } from "@ant-design/icons";

function GroupsFilterButton() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setDropdownVisible(flag);
  };

  const applyFilter = () => {
    setDropdownVisible(false);
  };

  const filterMenu = (
    <Menu>
      <Menu.Item>
        <Checkbox>Created by me</Checkbox>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Button type="primary" block onClick={applyFilter}>
          Apply Filter
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={filterMenu}
      placement="bottomLeft"
      trigger={["click"]}
      open={dropdownVisible}
      onOpenChange={handleVisibleChange}
    >
      <Button
        icon={<FilterOutlined />}
        style={{
          height: 42,
        }}
      />
    </Dropdown>
  );
}

export default GroupsFilterButton;
