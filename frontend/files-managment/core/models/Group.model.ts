import { User } from "./User.model";

export type Group = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
  owner: User;
};
