"use client";
import React, { useState } from "react";
import { Button, Col, Empty, Row } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

function FilesEmpty() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100%", width: "100%" }}
    >
      <Col>
        <Empty
          image={<FileAddOutlined style={{ fontSize: "100px" }} />}
          imageStyle={{ height: 100 }}
          description={<span>No Files Found</span>}
        >
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Upload File
          </Button>
        </Empty>
      </Col>
    </Row>
  );
}

export default FilesEmpty;
