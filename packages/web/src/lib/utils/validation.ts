import {
  CreateOrderSchema,
  type CreateOrder,
} from "@ecommerce/shared/dist/schemas/order";

type ValidationResult =
  | { success: true; data: CreateOrder }
  | { success: false; errors: Record<string, string> };

export function validateOrder(data: unknown): ValidationResult {
  try {
    return { success: true, data: CreateOrderSchema.parse(data) };
  } catch (error: any) {
    const errors: Record<string, string> = {};
    error.errors?.forEach((err: any) => {
      errors[err.path.join(".")] = err.message;
    });
    return { success: false, errors };
  }
}

export function formatValidationErrors(errors: Record<string, string>): string {
  return Object.entries(errors)
    .map(([field, message]) => `${field}: ${message}`)
    .join(", ");
}
