import { File } from "./File.model";
import { Group } from "./Group.model";

export type User = {
  id: number;
  username: string;
  email: string;
  lockedFiles: File[];
  uploadedFiles: File[];
  groups: Group[];
  ownedGroups: Group[];
};
