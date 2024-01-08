import React from "react";
import Card from "antd/es/card/Card";
import { File } from "@/core/models/File.model";

type FileCardProps = {
  file: File;
};

function FileCard({ file }: FileCardProps) {
  return (
    <Card
      hoverable
      title={file.name}
      // Add more styling and content here as needed
    >
      <p>{file.status}</p>
      {/* Display more file details */}
    </Card>
  );
}

export default FileCard;
