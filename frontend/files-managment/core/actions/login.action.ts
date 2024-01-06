"use server";
import { SignInDto, authService } from "@/core/services/auth.service";
import { redirect } from "next/navigation";

export const login = async (values: SignInDto) => {
  const response = await authService.signIn(values);
  console.log("Success:", response);
  redirect("/");
};
