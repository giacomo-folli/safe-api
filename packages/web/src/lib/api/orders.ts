import type { CreateOrder, OrderResponse } from "@ecommerce/shared";
import ApiClient from "./client";

export default class OrderService extends ApiClient {
  async create(orderData: CreateOrder): Promise<OrderResponse> {
    const res = await this.post<OrderResponse>("/orders", orderData);
    return res;
  }

  async getById(id: number): Promise<OrderResponse> {
    return await this.get<OrderResponse>(`/orders/${id}`);
  }

  async getAll(): Promise<OrderResponse[]> {
    return await this.get<OrderResponse[]>("/orders");
  }
}
