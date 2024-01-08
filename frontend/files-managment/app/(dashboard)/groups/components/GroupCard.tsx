import { Group } from "@/core/models/Group.model";
import { FolderOpenOutlined } from "@ant-design/icons";
import moment from "moment";
import GroupCardDropwonMenu from "./GroupCardDropwonMenu";
import Card from "antd/es/card/Card";
import { getAllUsers, getUserProfile } from "@/core/actions/users.actions";
import { getGroup } from "@/core/actions/group.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";

async function GroupCard({ group }: { group: Omit<Group, "users"> }) {
  const users = await getAllUsers();
  const currentUser = await getUserProfile();
  const groupData = await getGroup(group.id);

  return (
    <Card
      hoverable
      style={{
        cursor: "pointer",
      }}
      cover={
        <FontAwesomeIcon
          icon={faUserGroup}
          style={{
            fontSize: "64px",
            color: "#8CCA6E",
            paddingTop: "30px",
            paddingBottom: "20px",
            width: "80px",
            margin: "0 auto",
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
