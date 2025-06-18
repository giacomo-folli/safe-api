import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').notNullable()
      table.string('order_number').notNullable().unique()
      table.enum('status', ['pending', 'confirmed', 'shipped', 'delivered']).defaultTo('pending')
      table.decimal('total_amount', 10, 2).notNullable()
      table.json('shipping_address').notNullable()
      table.enum('payment_method', ['credit_card', 'paypal', 'apple_pay']).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
