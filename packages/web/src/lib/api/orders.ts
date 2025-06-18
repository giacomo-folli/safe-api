import type { CreateOrder, OrderResponse } from '@ecommerce/shared'
import { apiClient } from './client'

export const orderService = {
  async create(orderData: CreateOrder): Promise<OrderResponse> {
    return apiClient.post<OrderResponse>('/orders', orderData)
  },

  async getById(id: number): Promise<OrderResponse> {
    return apiClient.get<OrderResponse>(`/orders/${id}`)
  },

  async getAll(): Promise<OrderResponse[]> {
    return apiClient.get<OrderResponse[]>('/orders')
  }
}
