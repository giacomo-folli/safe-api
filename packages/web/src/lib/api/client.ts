import { browser } from "$app/environment";
import type {
  ApiResponse,
  ApiError as SharedApiError,
} from "@ecommerce/shared";

export class ApiError extends Error implements SharedApiError {
  constructor(
    message: string,
    public details?: any,
    public status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiClient {
  protected fetch: any;
  private baseUrl = "http://localhost:3333/api/v1";

  constructor(params: { fetch: any }) {
    if (browser) this.fetch = params.fetch.bind(window);
    else this.fetch = params.fetch;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await this.fetch(`${this.baseUrl}${endpoint}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
      throw new ApiError(
        data.error || "Request failed",
        data.details,
        response.status
      );
    }

    return data.data as T;
  }

  public async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  public async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

export default ApiClient;
