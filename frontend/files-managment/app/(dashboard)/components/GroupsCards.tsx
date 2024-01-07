"use client";
import React, { useState } from "react";
import { Card, Col, Row, Menu, Dropdown, Button, Empty } from "antd";
import { EllipsisOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Group } from "@/core/models/Group.model";
import GroupFormDialog from "./GroupFormDialog";
import GroupsEmpty from "./GroupsEmpty";
import GroupCard from "./GroupCard";
import { User } from "@/core/models/User.model";

function GroupsCards({
  groups,
  currentUser,
}: {
  groups: Group[];
  currentUser: User;
}) {
  return (
    <Row gutter={16} style={{ overflowY: "auto", height: "100%" }}>
      {groups.length === 0 ? (
        <GroupsEmpty />
      ) : (
        groups.map((group, index) => (
          <Col span={8} key={index}>
            <GroupCard
              group={group}
              isOwner={currentUser.id === group.owner.id}
            />
          </Col>
        ))
      )}
    </Row>
  );
}

export default GroupsCards;
