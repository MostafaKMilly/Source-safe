import React, { useState } from "react";
import { Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadFile, updateFile } from "@/core/actions/files.actions";
import { DraggerProps, RcFile } from "antd/es/upload";

const { Dragger } = Upload;

type FileUploadDialogProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  groupId: number;
  fileId?: number;
};

const FileUploadDialog = ({
  isVisible,
  setIsVisible,
  groupId,
  fileId,
}: FileUploadDialogProps) => {
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const handleOk = async () => {
    try {
      const file = fileList[0];
      const formData = new FormData();
      formData.append("file", file);

      if (fileId) {
        await updateFile(formData, fileId);
        message.success("File updated successfully");
      } else {
        await uploadFile(formData, groupId.toString());
        message.success("File uploaded successfully");
      }

      setFileList([]);
      setIsVisible(false);
    } catch (error) {
      message.error("Operation failed");
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const props: DraggerProps = {
    name: "file",
    multiple: false,
    onRemove: (file) => {
      setFileList(fileList.filter((item) => item.uid !== file.uid));
    },
    beforeUpload: (file) => {
      setFileList([file]);

      return false;
    },
    fileList,
  };

  return (
    <Modal
      title={fileId ? "Update File" : "Upload File"}
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={fileId ? "Update" : "Upload"}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </Modal>
  );
};

export default FileUploadDialog;
