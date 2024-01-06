import ApiService from "../api/api-service";

export type AuthToken = {
  access_token: string;
};

export type SignUpResponse = {
  username: string;
  email: string;
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

  public signIn(loginDetails: SignInDto): Promise<AuthToken> {
    return this.post<AuthToken>("/auth/sign-in", loginDetails);
  }
}

export const authService = new AuthService();
