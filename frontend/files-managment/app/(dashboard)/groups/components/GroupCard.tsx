import { Group } from "@/core/models/Group.model";
import { FolderOpenOutlined } from "@ant-design/icons";
import moment from "moment";
import GroupCardDropwonMenu from "./GroupCardDropwonMenu";
import Card from "antd/es/card/Card";
import { getAllUsers, getUserProfile } from "@/core/actions/users.actions";
import { getGroup } from "@/core/actions/group.actions";

async function GroupCard({ group }: { group: Omit<Group, "users"> }) {
  const users = await getAllUsers();
  const currentUser = await getUserProfile();
  const groupData = await getGroup(group.id);

  return (
    <Card
      cover={
        <FolderOpenOutlined
          style={{
            fontSize: "64px",
            color: "#8CCA6E",
            padding: "20px",
          }}
        />
      }
      title={group.name}
      extra={
        <GroupCardDropwonMenu
          group={groupData}
          isOwner={currentUser.id === group.owner.id}
          users={users}
        />
      }
    >
      <p>Creation Date: {moment(group.createdAt).format("YYYY-MM-DD HH:mm")}</p>
      <p>{group.description}</p>
    </Card>
  );
}

export default GroupCard;
