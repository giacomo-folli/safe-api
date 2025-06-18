import type { CreateOrder, OrderResponse } from "@ecommerce/shared";
import ApiClient from "./client";

export default class OrderService extends ApiClient {
  async create(orderData: CreateOrder): Promise<OrderResponse> {
    return this.client.post<OrderResponse>("/orders", orderData);
  }

  async getById(id: number): Promise<OrderResponse> {
    return this.client.get<OrderResponse>(`/orders/${id}`);
  }

  async getAll(): Promise<OrderResponse[]> {
    return this.client.get<OrderResponse[]>("/orders");
  }
}
