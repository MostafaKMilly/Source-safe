"use server";
import { RegisterUserDto, authService } from "@/core/services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (values: RegisterUserDto) => {
  const response = await authService.signUp(values);
  const cookiesStore = cookies();
  cookiesStore.set("token", response.access_token);
  redirect("/");
};
