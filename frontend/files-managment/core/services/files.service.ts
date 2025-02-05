import ApiService from "../api/api-service";
import { stringifyQueryParams } from "../api/utils";
import { File } from "../models/File.model";

export type CheckInFileDto = {
  fileIds: number[];
};

export type CheckOutFileDto = {
  fileId: number;
};

class FilesService extends ApiService {
  public uploadFile(data: FormData, groupId: string): Promise<boolean> {
    return this.post<boolean>(
      "/files/upload" + stringifyQueryParams({ groupId }),
      data,
      {
        body: data,
      },
      true
    );
  }

  public updateFile(fileId: number, data: FormData): Promise<boolean> {
    return this.post<boolean>(
      `/files/update/${fileId}`,
      data,
      {
        body: data,
      },
      true
    );
  }

  public checkIn(details: CheckInFileDto): Promise<boolean> {
    return this.post<boolean>("/files/check-in", details);
  }

  public checkOut(details: CheckOutFileDto): Promise<boolean> {
    return this.post<boolean>("/files/check-out", details);
  }

  public getFileStatus(fileId: number): Promise<string> {
    return this.get<string>(`/files/status/${fileId}`, undefined, {
      next: {
        tags: ["files"],
      },
    });
  }

  public getFile(fileId: number): Promise<File> {
    return this.get<File>(`/files/${fileId}`, undefined, {
      next: {
        tags: ["files"],
      },
    });
  }

  public getAllFiles(searchParams?: {
    search?: string;
    groupId?: number;
  }): Promise<File[]> {
    return this.get<File[]>("/files", searchParams, {
      next: {
        tags: ["files"],
      },
    });
  }
}

export const filesService = new FilesService();
