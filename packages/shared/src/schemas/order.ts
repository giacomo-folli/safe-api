import { z } from 'zod'

export const CreateOrderSchema = z.object({
  customerId: z.number().positive(),
  items: z.array(z.object({
    productId: z.number().positive(),
    quantity: z.number().min(1).max(99),
    pricePerUnit: z.number().positive()
  })).min(1),
  shippingAddress: z.object({
    street: z.string().min(5).max(100),
    apartment: z.string().max(20).optional(),
    city: z.string().min(2).max(50),
    postalCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    country: z.string().length(2)
  }),
  paymentMethod: z.enum(['credit_card', 'paypal', 'apple_pay'])
})

export const OrderResponseSchema = z.object({
  id: z.number(),
  orderNumber: z.string(),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered']),
  totalAmount: z.number(),
  items: z.array(z.object({
    productId: z.number(),
    productName: z.string(),
    quantity: z.number(),
    pricePerUnit: z.number()
  })),
  shippingAddress: CreateOrderSchema.shape.shippingAddress,
  createdAt: z.string()
})

export type CreateOrder = z.infer<typeof CreateOrderSchema>
export type OrderResponse = z.infer<typeof OrderResponseSchema>
