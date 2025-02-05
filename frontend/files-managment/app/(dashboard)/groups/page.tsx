import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import GroupsCards from "@/app/(dashboard)/groups/components/GroupsCards";
import Button from "antd/es/button";
import GroupsFilterButton from "./components/GroupsFilterButton";
import { getAllGroups } from "@/core/actions/group.actions";
import GroupsToolbar from "./components/GroupsToolbar";
import { getAllUsers, getUserProfile } from "@/core/actions/users.actions";

export default async function Home({
  searchParams,
}: {
  searchParams?: { name?: string; showOwnerGroups?: boolean };
}) {
  const groups = await getAllGroups(
    searchParams?.name,
    searchParams?.showOwnerGroups
  );

  return (
    <div
      style={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <Title level={2} style={{ marginTop: "0px", marginBottom: "16px" }}>
          Groups
        </Title>
        <GroupsToolbar />
      </div>
      <GroupsCards groups={groups} />
    </div>
  );
}
