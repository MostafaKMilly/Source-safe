"use server";
import {
  CreateGroupDto,
  UpdateGroupDto,
  AddUserDto,
  RemoveUserDto,
  groupsService,
} from "@/core/services/group.service";

export const createGroup = async (details: CreateGroupDto) => {
  const response = await groupsService.createGroup(details);
  return response;
};

export const updateGroup = async (groupId: number, details: UpdateGroupDto) => {
  const response = await groupsService.updateGroup(groupId, details);
  return response;
};

export const deleteGroup = async (groupId: number) => {
  return await groupsService.deleteGroup(groupId);
};

export const addUserToGroup = async (details: AddUserDto) => {
  const response = await groupsService.addUserToGroup(details);
  return response;
};

export const removeUserFromGroup = async (details: RemoveUserDto) => {
  const response = await groupsService.removeUserFromGroup(details);
  return response;
};

export const getAllGroups = async () => {
  const response = await groupsService.getAllGroups();
  return response;
};

export const getGroup = async (groupId: number) => {
  const response = await groupsService.getGroup(groupId);
  return response;
};
