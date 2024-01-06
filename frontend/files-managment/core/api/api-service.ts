import ApiProvider from "./api-provider";
import { stringifyQueryParams } from "./utils";

export default class ApiService {
  private apiProvider: ApiProvider;

  constructor() {
    this.apiProvider = new ApiProvider();
  }

  // GET request
  public get<T>(
    endpoint: string,
    queryParams?: Record<string, any>,
    options?: RequestInit
  ): Promise<T> {
    const queryString = queryParams ? stringifyQueryParams(queryParams) : "";
    return this.apiProvider.request<T>({
      endpoint: `${endpoint}${queryString}`,
      options: {
        method: "GET",
        ...options,
      },
    });
  }

  // POST request
  public post<T>(endpoint: string, body: any, options?: RequestInit): Promise<T> {
    return this.apiProvider.request<T>({
      endpoint,
      options: {
        method: "POST",
        body: JSON.stringify(body),
        ...options,
      },
    });
  }

  // PUT request
  public put<T>(endpoint: string, body: any, options?: RequestInit): Promise<T> {
    return this.apiProvider.request<T>({
      endpoint,
      options: {
        method: "PUT",
        body: JSON.stringify(body),
        ...options,
      },
    });
  }

  // PUT request
  public patch<T>(endpoint: string, body: any, options?: RequestInit): Promise<T> {
    return this.apiProvider.request<T>({
      endpoint,
      options: {
        method: "PATCH",
        body: JSON.stringify(body),
        ...options,
      },
    });
  }

  // DELETE request
  public delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.apiProvider.request<T>({
      endpoint,
      options: {
        method: "DELETE",
        ...options,
      },
    });
  }
}
