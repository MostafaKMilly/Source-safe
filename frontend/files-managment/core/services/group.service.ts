import ApiService from "../api/api-service";
import { Group } from "../models/Group.model";

export type CreateGroupDto = {
  name: string;
  description: string;
};

export type UpdateGroupDto = {
  name?: string;
  description: string;
};

export type AddUserDto = {
  users: number[];
  groupId: number;
};

export type RemoveUserDto = {
  userId: number;
  groupId: number;
};

export type SetGroupUsersDto = {
  groupId: number;
  userIds: number[];
};

class GroupsService extends ApiService {
  public createGroup(details: CreateGroupDto): Promise<Group> {
    return this.post<Group>("/group/create", details);
  }

  public getAllGroups(
    name?: string,
    showOwnerGroups?: boolean
  ): Promise<Omit<Group, "users">[]> {
    return this.get<Group[]>(
      "/group/getAll",
      { name, showOwnerGroups },
      {
        next: {
          tags: ["groups"],
        },
      }
    );
  }

  public getGroup(id: number): Promise<Group> {
    return this.get<Group>(`/group/${id}`, undefined, {
      next: {
        tags: ["groups"],
      },
    });
  }

  public updateGroup(id: number, details: UpdateGroupDto): Promise<Group> {
    return this.patch<Group>(`/group/${id}`, details);
  }

  public deleteGroup(id: number): Promise<void> {
    return this.delete<void>(`/group/${id}`);
  }

  public addUsersToGroup(details: AddUserDto): Promise<boolean> {
    return this.post<boolean>("/group/addUser", details);
  }

  public removeUserFromGroup(details: RemoveUserDto): Promise<boolean> {
    return this.post<boolean>("/group/removeUser", details);
  }
  public setGroupUsers(data: SetGroupUsersDto): Promise<boolean> {
    return this.post<boolean>("/group/setUsers", data);
  }
  public leaveGroup(groupId: number): Promise<boolean> {
    return this.post<boolean>(`/group/${groupId}/leave`, {});
  }
}

export const groupsService = new GroupsService();
