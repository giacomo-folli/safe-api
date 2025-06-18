import { CreateOrderSchema } from '@ecommerce/shared'

export function validateOrder(data: unknown) {
  try {
    return { success: true, data: CreateOrderSchema.parse(data) }
  } catch (error: any) {
    const errors: Record<string, string> = {}
    error.errors?.forEach((err: any) => {
      errors[err.path.join('.')] = err.message
    })
    return { success: false, errors }
  }
}

export function formatValidationErrors(errors: Record<string, string>): string {
  return Object.entries(errors)
    .map(([field, message]) => `${field}: ${message}`)
    .join(', ')
}
