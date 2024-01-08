"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Upload, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Title from "antd/es/typography/Title";
import FileUploadDialog from "./FileUploadDialog";

function GroupToolbar({
  groupId,
  children,
}: {
  groupId: number;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const router = useRouter();
  const pathname = usePathname();
  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    const params = new URLSearchParams(location.search);
    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    router.replace(pathname + "?" + params.toString());
  };

  const onUpload = () => {
    setIsUploadVisible(true);
    console.log("Upload initiated");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <Title level={3}>Group files</Title>
      <Row align="middle" style={{ gap: "10px" }}>
        <Input
          placeholder="Search files..."
          value={search}
          onChange={onSearchChange}
          style={{
            width: 300,
          }}
        />
        <Button icon={<UploadOutlined />} onClick={onUpload}>
          Upload
        </Button>

        {children}
      </Row>
      <FileUploadDialog
        groupId={groupId}
        setIsVisible={setIsUploadVisible}
        isVisible={isUploadVisible}
      />
    </div>
  );
}

export default GroupToolbar;
