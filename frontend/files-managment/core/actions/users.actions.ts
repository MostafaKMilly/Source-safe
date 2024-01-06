"use server";

import { cookies } from "next/headers";
import { usersService } from "../services/users.service";
import { redirect } from "next/navigation";

export const getAllUsers = async () => {
  const response = await usersService.getAllUsers();
  return response;
};

export const getUser = async (userId: number) => {
  const response = await usersService.getUser(userId);
  return response;
};

export const findByUsername = async (username: string) => {
  const response = await usersService.findByUsername(username);
  return response;
};

export const getUserProfile = async () => {
  const response = await usersService.getUserProfile();
  return response;
};

export const logoutUser = async () => {
  const cookiesStore = cookies();
  cookiesStore.delete("token");
  redirect("/login");
};
