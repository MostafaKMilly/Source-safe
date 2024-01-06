"use server";
import {
  CreateGroupDto,
  UpdateGroupDto,
  AddUserDto,
  RemoveUserDto,
  groupsService,
} from "@/core/services/group.service";
import { revalidateTag } from "next/cache";

export const createGroup = async (details: CreateGroupDto) => {
  const response = await groupsService.createGroup(details);
  revalidateTag("groups");
  return response;
};

export const updateGroup = async (groupId: number, details: UpdateGroupDto) => {
  const response = await groupsService.updateGroup(groupId, details);
  revalidateTag("groups");
  return response;
};

export const deleteGroup = async (groupId: number) => {
  revalidateTag("groups");
  return await groupsService.deleteGroup(groupId);
};

export const addUsersToGroup = async (details: AddUserDto) => {
  const response = await groupsService.addUsersToGroup(details);
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
