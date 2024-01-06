"use client";
import React from "react";
import { Card, Col, Row, Menu, Dropdown, Button } from "antd";
import { EllipsisOutlined, FolderOpenOutlined } from "@ant-design/icons";

function GroupsCards({
  groups,
}: {
  groups: {
    creationDate: string;
    description: string;
    title: string;
  }[];
}) {
  // Dropdown menu for card
  const menu = (
    <Menu>
      <Menu.Item key="1">Join</Menu.Item>
      {/* other items if necessary */}
    </Menu>
  );

  return (
    <Row gutter={16} style={{ overflowY: "auto" }}>
      {groups.map((group, index) => (
        <Col span={8} key={index}>
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
            title={group.title}
            extra={
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button shape="circle" icon={<EllipsisOutlined />} />
              </Dropdown>
            }
          >
            <p>Creation Date: {group.creationDate}</p>
            <p>{group.description}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GroupsCards;
