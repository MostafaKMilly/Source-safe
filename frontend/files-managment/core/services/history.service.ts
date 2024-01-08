import ApiService from "../api/api-service";
import { History } from "../models/History.model";

class HistoryService extends ApiService {
  public findAll(): Promise<History[]> {
    return this.get<History[]>("/history");
  }

  public findOne(id: number): Promise<History> {
    return this.get<History>(`/history/${id}`);
  }

  public findOneByFileId(fileId: number): Promise<History[]> {
    return this.get<History>(`/history/file/${fileId}`);
  }

  public findAllLockedByUser(userId: number): Promise<History[]> {
    return this.get<History[]>(`/history/locked-by-user/${userId}`);
  }
}

export const historyService = new HistoryService();
