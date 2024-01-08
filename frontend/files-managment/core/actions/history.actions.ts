"use server";

import { historyService } from "../services/history.service";

export const findAllHistory = async () => {
  const response = await historyService.findAll();

  return response;
};

export const findHistoryById = async (id: number) => {
  const response = await historyService.findOne(id);

  return response;
};

export const findHistoryByFileId = async (fileId: number) => {
  const response = await historyService.findOneByFileId(fileId);

  return response;
};

export const findAllLockedByUser = async (userId: number) => {
  const response = await historyService.findAllLockedByUser(userId);

  return response;
};
