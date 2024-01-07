import { Group } from "@/core/models/Group.model";
import GroupsEmpty from "./GroupsEmpty";
import GroupCard from "./GroupCard";
import Row from "antd/es/row";
import Col from "antd/es/col";

function GroupsCards({ groups }: { groups: Omit<Group, "users">[] }) {
  return (
    <Row gutter={16} style={{ overflowY: "auto", height: "100%" }}>
      {groups.length === 0 ? (
        <GroupsEmpty />
      ) : (
        groups.map((group, index) => (
          <Col span={8} key={index}>
            <GroupCard group={group} />
          </Col>
        ))
      )}
    </Row>
  );
}

export default GroupsCards;
