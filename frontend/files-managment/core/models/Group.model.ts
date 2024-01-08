import { File } from "./File.model";
import { User } from "./User.model";

export type Group = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
  owner: User;
  files: File[];
};
