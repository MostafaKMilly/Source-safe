import { useState } from "react";
import { Group } from "@/core/models/Group.model";
import { Modal, Select, notification } from "antd";
import { setGroupUsers } from "@/core/actions/group.actions";
import { User } from "@/core/models/User.model";

export function UserSelectDialog({
  group,
  visible,
  setVisible,
  users,
}: {
  group: Group;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  users: User[];
}) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    group.users.map((user) => user.id.toString())
  );

  console.log(group.users)
  const handleOk = async () => {
    const userIds = selectedUsers.map((userId) => parseInt(userId));

    try {
      await setGroupUsers({ groupId: group.id, userIds });
      setVisible(false);

      
      notification.success({
        message: "Success",
        description: "Users have been updated successfully!",
      });
    } catch (error) {
      
      console.error("Error:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while updating users.",
      });
    }
  };
  return (
    <Modal
      title="Add/Remove Users"
      open={visible}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
    >
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Select users"
        value={selectedUsers}
        onChange={setSelectedUsers}
        options={users.map((user) => ({
          value: user.id.toString(),
          label: user.username,
        }))}
      />
    </Modal>
  );
}
