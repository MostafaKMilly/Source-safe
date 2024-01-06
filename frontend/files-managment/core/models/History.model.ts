import { File } from "./File.model";

export type History = {
  id: number;
  file: File;
  createdAt: Date;
  updatedAt: Date;
};
