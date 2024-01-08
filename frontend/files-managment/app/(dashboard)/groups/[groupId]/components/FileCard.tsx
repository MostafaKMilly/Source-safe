"use client";
import React, { useState } from "react";
import { Card, Menu, Dropdown, Button, notification, Row } from "antd";
import {
  FileOutlined,
  EditOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { File } from "@/core/models/File.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { User } from "@/core/models/User.model";
import { checkInFile, checkOutFile } from "@/core/actions/files.actions";
import FileUploadDialog from "./FileUploadDialog";
import { useRouter } from "next/navigation";

type FileCardProps = {
  file: File;
  currentUser: User;
};

const API_LINK = process.env.NEXT_PUBLIC_API_URI;

function getFileIcon(ext: string) {
  switch (ext.toLowerCase()) {
    case "pdf":
      return <FileOutlined style={{ fontSize: "60px", color: "#8CCA6E" }} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return (
        <FontAwesomeIcon
          icon={faImage}
          style={{
            fontSize: "60px",
            color: "#8CCA6E",
            width: "80px",
            height: "60px",
          }}
        />
      );
    default:
      return <FileOutlined style={{ fontSize: "60px", color: "#8CCA6E" }} />;
  }
}

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

function FileCard({ file, currentUser }: FileCardProps) {
  const fileExtension = file.name.split(".").pop();
  const [updateFileVisisble, setUpdateFileVisisble] = useState(false);
  const isFileCheckedOut = file.status === "checked-out";
  const isCurrentUserOwner = file.lockedBy?.id === currentUser.id;
  const router = useRouter();

  const handleDownload = () => {
    const fileUrl = `${API_LINK}/${file.path}`;
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = file.name;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCheckIn = async () => {
    try {
      await checkInFile({ fileIds: [file.id] });
      showNotification(
        "success",
        "Check-In Successful",
        `You have successfully checked in ${file.name}`
      );
    } catch (error) {
      showNotification("error", "Check-In Failed", (error as Error).message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOutFile({ fileId: file.id });
      showNotification(
        "success",
        "Check-Out Successful",
        `You have successfully checked out ${file.name}`
      );
    } catch (error) {
      showNotification("error", "Check-Out Failed", (error as Error).message);
    }
  };
  const menu = (
    <Menu>
      {!isFileCheckedOut && (
        <Menu.Item
          key="1"
          icon={<CheckCircleOutlined />}
          onClick={handleCheckIn}
        >
          Check In
        </Menu.Item>
      )}
      {isFileCheckedOut && isCurrentUserOwner && (
        <Menu.Item
          key="2"
          icon={<CloseCircleOutlined />}
          onClick={handleCheckOut}
        >
          Check Out
        </Menu.Item>
      )}
      <Menu.Item
        key="3"
        icon={<EditOutlined />}
        disabled={!isCurrentUserOwner}
        onClick={() => {
          setUpdateFileVisisble(true);
        }}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<HistoryOutlined />}
        onClick={() => {
          router.push("/history?fileId=" + file.id);
        }}
      >
        History
      </Menu.Item>
      <Menu.Item key="5" icon={<DownloadOutlined />} onClick={handleDownload}>
        Download
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      hoverable
      title={file.name}
      cover={
        <div
          style={{
            paddingTop: "30px",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {getFileIcon(fileExtension || "")}
        </div>
      }
      extra={
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button shape="circle" icon={<EllipsisOutlined />} />
        </Dropdown>
      }
    >
      <Row style={{ alignItems: "center", columnGap: "8px", margin: 0 }}>
        <p style={{ margin: 0 }}>Status: {file.status}</p>
        {file.status === "checked-out" && (
          <p style={{ margin: 0 }}>, Locked by: {file.lockedBy?.username}</p>
        )}
      </Row>
      <p>Owner: {file.uploadedBy?.username}</p>
      <p>Creation Date: {moment(file.createdAt).format("YYYY-MM-DD HH:mm")}</p>
      <FileUploadDialog
        groupId={file.group.id}
        isVisible={updateFileVisisble}
        setIsVisible={setUpdateFileVisisble}
        fileId={file.id}
      />
    </Card>
  );
}

export default FileCard;
