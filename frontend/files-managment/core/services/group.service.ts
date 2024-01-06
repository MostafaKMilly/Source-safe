import ApiService from "../api/api-service";

export type GroupDetails = {
    id: number;
    name: string;
    users: number[];
};

export type CreateGroupDto = {
    name: string;
};

export type UpdateGroupDto = {
    name?: string;
};

export type AddUserDto = {
    users: number[];
    groupId: number;
};

export type RemoveUserDto = {
    userId: number;
    groupId: number;
};

class GroupsService extends ApiService {
    public createGroup(details: CreateGroupDto): Promise<GroupDetails> {
        return this.post<GroupDetails>("/group/create", details);
    }

    public getAllGroups(): Promise<GroupDetails[]> {
        return this.get<GroupDetails[]>("/group/getAll");
    }

    public getGroup(id: number): Promise<GroupDetails> {
        return this.get<GroupDetails>(`/group/${id}`);
    }

    public updateGroup(id: number, details: UpdateGroupDto): Promise<GroupDetails> {
        return this.patch<GroupDetails>(`/group/${id}`, details);
    }

    public deleteGroup(id: number): Promise<void> {
        return this.delete<void>(`/group/${id}`);
    }

    public addUserToGroup(details: AddUserDto): Promise<boolean> {
        return this.post<boolean>("/group/addUser", details);
    }

    public removeUserFromGroup(details: RemoveUserDto): Promise<boolean> {
        return this.post<boolean>("/group/removeUser", details);
    }
}

export const groupsService = new GroupsService();
