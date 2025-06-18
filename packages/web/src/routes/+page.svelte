<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  let orders = data.orders;
</script>

<div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Orders</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each orders as order}
        <a
          href={`/orders/${order.id}`}
          class="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div class="px-6 py-4 border-b border-gray-100">
            <div class="flex justify-between items-center mb-4">
              <p class="text-sm text-gray-600">
                Order ID:{" "}
                <span class="font-medium text-gray-900">{order.id}</span>
              </p>
              <span
                class="px-3 py-1 rounded-full text-sm {order.status ===
                'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'}"
              >
                {order.status}
              </span>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-600">
                Shipping to:{" "}
                <span class="font-medium text-gray-900"
                  >{order.shippingAddress.city}, {order.shippingAddress
                    .country}</span
                >
              </p>
              <p class="text-lg font-semibold text-gray-900">
                ${order.totalAmount}
              </p>
            </div>
          </div>

          <div class="px-6 py-4">
            <h2 class="text-sm font-medium text-gray-900 mb-3">Order Items</h2>
            <ul class="space-y-2">
              {#each order.items as item}
                <li class="flex justify-between items-center text-sm">
                  <div class="flex items-center space-x-2">
                    <span class="font-medium">{item.productName}</span>
                    <span class="text-gray-500">&times; {item.quantity}</span>
                  </div>
                  <span class="text-gray-900">${item.pricePerUnit}</span>
                </li>
              {/each}
            </ul>
          </div>
        </a>
      {:else}
        <div
          class="col-span-full flex items-center justify-center h-32 bg-white rounded-lg border-2 border-dashed border-gray-300"
        >
          <p class="text-gray-500">No orders found.</p>
        </div>
      {/each}
    </div>
  </div>
</div>
