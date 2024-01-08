"use client";
import React, { useState } from "react";
import Row from "antd/es/row";
import Col from "antd/es/col";
import FilesEmpty from "./FilesEmpty";
import { File } from "@/core/models/File.model";
import FileCard from "./FileCard";
import { getUserProfile } from "@/core/actions/users.actions";
import { User } from "@/core/models/User.model";
import { checkInFile } from "@/core/actions/files.actions";
import { Button, notification } from "antd";
import GroupToolbar from "./GroupToolbar";

type FilesCardsProps = {
  files: File[];
  currentUser: User;
  groupId: number;
};

const showNotification = (
  type: "success" | "error",
  message: string,
  description: string
) => {
  notification[type]({
    message: message,
    description: description,
    placement: "bottomRight",
  });
};

function FilesCards({ files, currentUser, groupId }: FilesCardsProps) {
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const handleFileSelect = (fileId: number, isSelected: boolean) => {
    setSelectedFiles((prevSelectedFiles) =>
      isSelected
        ? [...prevSelectedFiles, fileId]
        : prevSelectedFiles.filter((id) => id !== fileId)
    );
  };

  const handleBulkCheckIn = async () => {
    try {
      await checkInFile({ fileIds: selectedFiles });
      showNotification(
        "success",
        "Check-In Successful",
        `You have successfully checked selected files`
      );
    } catch (error) {
      showNotification("error", "Check-In Failed", (error as Error).message);
    }
  };

  return (
    <>
      <GroupToolbar groupId={groupId}>
        <Button
          disabled={selectedFiles.length === 0}
          onClick={handleBulkCheckIn}
        >
          Check-In
        </Button>
      </GroupToolbar>

      <Row
        gutter={16}
        style={{ overflowY: "auto", height: "100%", marginTop: "32px" }}
      >
        {files.length === 0 ? (
          <FilesEmpty />
        ) : (
          files.map((file, index) => (
            <Col span={8} key={index}>
              <FileCard
                file={file}
                currentUser={currentUser}
                onFileSelect={handleFileSelect}
                selectedFiles={selectedFiles}
              />
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

export default FilesCards;
