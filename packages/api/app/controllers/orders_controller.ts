import type { HttpContext } from '@adonisjs/core/http'
import { CreateOrderSchema, type OrderResponse } from '@ecommerce/shared'
import BaseController from './base_controller.js'
import Order from '#models/order'
import db from '@adonisjs/lucid/services/db'

export default class OrdersController extends BaseController {
  async store({ request, response }: HttpContext) {
    const trx = await db.transaction()

    const orderData = await this.validateBody(
      { request, response } as HttpContext,
      CreateOrderSchema
    )

    // Calculate total amount
    const totalAmount = orderData.items.reduce(
      (sum, item) => sum + item.quantity * item.pricePerUnit,
      0
    )

    // Create order
    const order = await Order.create(
      {
        customerId: orderData.customerId,
        orderNumber: `ORD-${Date.now()}`,
        status: 'pending',
        totalAmount,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
      },
      { client: trx }
    )

    // Create order items
    await order.related('items').createMany(
      orderData.items.map((item) => ({
        productId: item.productId,
        productName: `Product ${item.productId}`, // In real app, fetch from products table
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
      })),
      { client: trx }
    )

    await order.load('items')

    const orderResponse: OrderResponse = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
      })),
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt.toISO()!,
    }

    await trx.commit()
    return this.success(orderResponse)
  }

  async show({ params, response }: HttpContext) {
    const trx = await db.transaction()

    const order = await Order.findOrFail(params.id, { client: trx })
    await order.load('items')

    const orderResponse: OrderResponse = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
      })),
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt.toISO()!,
    }

    await trx.commit()
    return response.json(this.success(orderResponse))
  }

  async index({ response }: HttpContext) {
    const trx = await db.transaction()

    const orders = await Order.query({ client: trx }).preload('items')

    const ordersResponse: OrderResponse[] = orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
      })),
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt.toISO()!,
    }))

    await trx.commit()
    return response.json(this.success(ordersResponse))
  }
}
