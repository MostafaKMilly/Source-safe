import ApiService from "../api/api-service";
import { User } from "../models/User.model";

class UsersService extends ApiService {
  public getAllUsers(): Promise<User[]> {
    return this.get<User[]>("/users");
  }

  public getUser(id: number): Promise<User> {
    return this.get<User>(`/users/${id}`);
  }

  public findByUsername(username: string): Promise<User> {
    return this.get<User>(`/users/username/${username}`);
  }
  public getUserProfile(): Promise<User> {
    return this.get<User>(`/users/me`);
  }
}

export const usersService = new UsersService();
