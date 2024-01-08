import React from "react";
import { getGroup } from "@/core/actions/group.actions";
import Descriptions from "antd/es/descriptions";
import moment from "moment";
import GroupToolbar from "./components/GroupToolbar";
import FilesCards from "./components/FilesCards";
import { getAllFiles } from "@/core/actions/files.actions";

type GroupPageProps = {
  params: {
    groupId: number;
  };
  searchParams: {
    search?: string;
  };
};

const GroupPage: React.FC<GroupPageProps> = async ({
  params,
  searchParams,
}) => {
  const group = await getGroup(params.groupId);
  const files = await getAllFiles({
    groupId: params.groupId,
    search: searchParams.search || "",
  });

  const items = [
    { label: "Name", content: group.name },
    { label: "Description", content: group.description },
    {
      label: "Created At",
      content: moment(group.createdAt).format("YYYY-MM-DD HH:mm"),
    },
    { label: "Owner", content: group.owner.username },
    { label: "Files count", content: files.length || 0 },
    { label: "Members count", content: group.users?.length || 0 },
  ].map((item, index) => ({
    key: index.toString(),
    label: item.label,
    children: item.content,
  }));

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Descriptions title="Group Details" column={3} items={items} />
      <GroupToolbar groupId={group.id} />
      <FilesCards files={files} />
    </div>
  );
};

export default GroupPage;
