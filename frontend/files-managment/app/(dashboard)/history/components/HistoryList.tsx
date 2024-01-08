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
    <div>
      <Table dataSource={history} columns={columns} rowKey="id" />
    </div>
  );
}

export default HistoryList;
