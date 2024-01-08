"use client";
import React from "react";
import { Table } from "antd";
import { History } from "@/core/models/History.model";
import moment from "moment";

function HistoryList({ history = [] }: { history: History[] }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "File Name",
      dataIndex: ["file", "name"],
      key: "fileName",
      width: 300,
    },

    {
      title: "Locked by",
      dataIndex: ["file", "lockedBy", "username"],
      key: "username",
      render: (text: string) => (text ? text : "N/A"),
    },
    {
      title: "Uploaded by",
      dataIndex: ["file", "uploadedBy", "username"],
      key: "username",
    },
    {
      title: "File status",
      dataIndex: ["file", "status"],
      key: "username",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => (
        <span>{moment(text).format("YYYY-MM-DD HH:mm")}</span>
      ),
    },
  ];

  return (
    <div style={{ height: "100%" }}>
      <Table
        dataSource={history}
        columns={columns}
        rowKey="id"
        scroll={{ y: 470 }}
      />
    </div>
  );
}

export default HistoryList;
