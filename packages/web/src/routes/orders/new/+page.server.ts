import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { OrderResponse } from "@ecommerce/shared";
import { validateOrder, formatValidationErrors } from "$lib/utils/validation";
import OrderService from "$lib/api/orders";

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    // Parse form data into an object
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData.entries());

    // Parse nested data (items and shipping address)
    const data = {
      ...rawData,
      customerId: Number(rawData.customerId),
      items: JSON.parse(formData.get("items")?.toString() ?? "[]"),
      shippingAddress: JSON.parse(
        formData.get("shippingAddress")?.toString() ?? "{}"
      ),
    };

    // Validate the order data
    const validation = validateOrder(data);
    if (!validation.success) {
      return fail(400, {
        success: false,
        data,
        errors: validation.errors,
        message: formatValidationErrors(validation.errors),
      });
    }

    let order: OrderResponse;
    try {
      // Create the order
      const service = new OrderService({ fetch });
      order = await service.create(validation.data);
    } catch (error: any) {
      console.error("Failed to create order:", error.message);

      // Return a more specific error message if available
      const message =
        error.response?.data?.message ??
        "Failed to create order. Please try again.";
      return fail(500, { success: false, data, message });
    }

    // Redirect to the order details page on success
    if (order) throw redirect(303, `/orders/${order.id}`);
  },
} satisfies Actions;
