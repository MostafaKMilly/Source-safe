import React, { useEffect, useState } from "react";
import { getGroup } from "@/core/actions/group.actions";
import Descriptions from "antd/es/descriptions";
import DescriptionsItem from "antd/es/descriptions/Item";
import List from "antd/es/list";
import ListItem from "antd/es/list/Item";
import Card from "antd/es/card/Card";

type GroupPageProps = {
  params: {
    groupId: number;
  };
};

const GroupPage: React.FC<GroupPageProps> = async ({ params }) => {
  const group = await getGroup(params.groupId);

  return (
    <div>
      <Descriptions title="Group Details" bordered>
        <DescriptionsItem label="Name">{group.name}</DescriptionsItem>
        <DescriptionsItem label="Description">
          {group.description}
        </DescriptionsItem>
        <DescriptionsItem label="Created At">
          {group.createdAt}
        </DescriptionsItem>
        <DescriptionsItem label="Updated At">
          {group.updatedAt}
        </DescriptionsItem>
        <DescriptionsItem label="Owner">
          {group.owner.username}
        </DescriptionsItem>
      </Descriptions>

      
    </div>
  );
};

export default GroupPage;
