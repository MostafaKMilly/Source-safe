"use server";
import {
  CheckInFileDto,
  CheckOutFileDto,
  filesService,
} from "@/core/services/files.service";
import { revalidateTag } from "next/cache";

export const uploadFile = async (formData: FormData, groupId: string) => {
  const response = await filesService.uploadFile(formData, groupId);
  revalidateTag("files");
  return response;
};

export const updateFile = async (formData: FormData, fileId: number) => {
  const response = await filesService.updateFile(fileId, formData);
  revalidateTag("files");
  return response;
};

export const checkInFile = async (details: CheckInFileDto) => {
  const response = await filesService.checkIn(details);
  revalidateTag("files");
  return response;
};

export const checkOutFile = async (details: CheckOutFileDto) => {
  const response = await filesService.checkOut(details);
  revalidateTag("files");
  return response;
};

export const getFileStatus = async (fileId: number) => {
  const response = await filesService.getFileStatus(fileId);
  return response;
};

export const getFile = async (fileId: number) => {
  const response = await filesService.getFile(fileId);
  return response;
};

export const getAllFiles = async (searchParams?: {
  search?: string;
  groupId?: number;
}) => {
  const response = await filesService.getAllFiles(searchParams);
  return response;
};
