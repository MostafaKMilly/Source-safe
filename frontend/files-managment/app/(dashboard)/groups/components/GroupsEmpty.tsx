"use client"
import { FolderOpenOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Row } from "antd";
import React, { useState } from "react";
import GroupFormDialog from "./GroupFormDialog";

function GroupsEmpty() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100%", width: "100% " }}
    >
      <Col>
        <Empty
          image={<FolderOpenOutlined style={{ fontSize: "100px" }} />}
          imageStyle={{
            height: 100,
          }}
          description={<span>No Groups Found</span>}
        >
          <Button
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Create Group
          </Button>
        </Empty>
      </Col>
      <GroupFormDialog
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Row>
  );
}

export default GroupsEmpty;
