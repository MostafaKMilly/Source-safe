"use server";
import { SignInDto, authService } from "@/core/services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (values: SignInDto) => {
  const response = await authService.signIn(values);
  const cookiesStore = cookies();
  cookiesStore.set("token", response.access_token);
  redirect("/");
};
