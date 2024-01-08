import { Group } from "./Group.model";
import { History } from "./History.model";
import { User } from "./User.model";

export type File = {
  id: number;
  name: string;
  path: string;
  status: "free" | "checked-out";
  lockedBy: User | null;
  uploadedBy: User | null;
  history: History[];
  createdAt: Date;
  updatedAt: Date;
  group: Group;
};
