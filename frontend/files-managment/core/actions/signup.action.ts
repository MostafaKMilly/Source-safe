"use server";
import {
  RegisterUserDto,
  SignInDto,
  authService,
} from "@/core/services/auth.service";
import { redirect } from "next/navigation";

export const signup = async (values: RegisterUserDto) => {
  const response = await authService.signUp(values);
  console.log("Success:", response);
  redirect("/");
};
