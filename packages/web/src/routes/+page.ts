import OrderService from "$lib/api/orders";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const service = new OrderService({ fetch });
  const orders = await service.getAll();

  return { orders };
};
