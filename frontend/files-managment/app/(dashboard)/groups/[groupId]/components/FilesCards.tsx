import React from "react";
import Row from "antd/es/row";
import Col from "antd/es/col";
import FilesEmpty from "./FilesEmpty";
import { File } from "@/core/models/File.model";
import FileCard from "./FileCard";
import { getUserProfile } from "@/core/actions/users.actions";

type FilesCardsProps = {
  files: File[];
};

async function FilesCards({ files }: FilesCardsProps) {
  const currentUser = await getUserProfile();

  return (
    <Row
      gutter={16}
      style={{ overflowY: "auto", height: "100%", marginTop: "32px" }}
    >
      {files.length === 0 ? (
        <FilesEmpty />
      ) : (
        files.map((file, index) => (
          <Col span={8} key={index}>
            <FileCard file={file} currentUser={currentUser} />
          </Col>
        ))
      )}
    </Row>
  );
}

export default FilesCards;
