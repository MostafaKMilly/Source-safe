import {
  DownOutlined,
  EllipsisOutlined,
  FilterOutlined,
  FolderOpenOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/es/menu/MenuItem";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import GroupsCards from "@/app/(dashboard)/components/GroupsCards";
import Button from "antd/es/button";
import Menu from "antd/es/menu";
import Checkbox from "antd/es/checkbox/Checkbox";
import Dropdown from "antd/es/dropdown/dropdown";
import MenuDivider from "antd/es/menu/MenuDivider";
import GroupsFilterButton from "./components/GroupsFilterButton";

const groups = [
  {
    title: "Group 1",
    creationDate: "2023-01-01",
    description: "Description of Group 1",
  },
  // ... other groups
];

export default function Home() {
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
        <div style={{ display: "flex", columnGap: "8px" }}>
          <Search
            placeholder="Search groups"
            style={{ marginBottom: "20px", width: 300 }}
          />
          <GroupsFilterButton />
          <Button
            icon={<PlusOutlined />}
            type="primary"
            style={{
              height: 42,
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <GroupsCards groups={groups} />
    </div>
  );
}
