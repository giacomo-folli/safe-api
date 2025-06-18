import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import OrderItem from './order_item.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare orderNumber: string

  @column()
  declare status: 'pending' | 'confirmed' | 'shipped' | 'delivered'

  @column()
  declare totalAmount: number

  @column({
    serialize: (value: string) => JSON.parse(value),
    prepare: (value: any) => JSON.stringify(value)
  })
  declare shippingAddress: {
    street: string
    apartment?: string
    city: string
    postalCode: string
    country: string
  }

  @column()
  declare paymentMethod: 'credit_card' | 'paypal' | 'apple_pay'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => OrderItem)
  declare items: HasMany<typeof OrderItem>
}
