import ApiService from "../api/api-service";
import { User } from "../models/User.model";

export type SignInResponse = {
  access_token: string;
  user: User;
};

export type SignUpResponse = {
  access_token: string;
  user: {
    username: string;
    email: string;
    password: string;
    id: number;
  };
};

export type RegisterUserDto = {
  username: string;
  email: string;
  password: string;
};

export type SignInDto = {
  username: string;
  password: string;
};

class AuthService extends ApiService {
  public signUp(userDetails: RegisterUserDto): Promise<SignUpResponse> {
    return this.post<SignUpResponse>("/auth/sign-up", userDetails);
  }

  public signIn(loginDetails: SignInDto): Promise<SignInResponse> {
    return this.post<SignInResponse>("/auth/sign-in", loginDetails);
  }
}

export const authService = new AuthService();
