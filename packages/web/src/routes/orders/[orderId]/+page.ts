import OrderService from "$lib/api/orders";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  const { orderId } = params;

  const service = new OrderService({ fetch });
  const order = await service.getById(Number(orderId));
  return { order };
};
