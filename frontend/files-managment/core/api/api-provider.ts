import { fetchAPIInstanceProps } from "./types";
import { cookies } from "next/headers";

export default class ApiProvider {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.API_URI || "";
  }

  public async request<T>(config: fetchAPIInstanceProps): Promise<T> {
    try {
      const response = await this._fetch<T>(config);

      return response;
    } catch (error) {
      throw error;
    }
  }
  private async _fetch<T>(config: fetchAPIInstanceProps): Promise<T> {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const baseURL = this.baseURL;

    const response = await fetch(`${baseURL}${config.endpoint}`, {
      ...config.options,
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
        ...(config.options?.headers ?? {}),
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError?.message);
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return await response.json();
    } else if (contentType?.includes("text/plain")) {
      return (await response.text()) as T;
    } else if (contentType?.includes("application/zip")) {
      return (await response.blob()) as T;
    } else {
      throw new Error("Unsupported content type");
    }
  }
}
