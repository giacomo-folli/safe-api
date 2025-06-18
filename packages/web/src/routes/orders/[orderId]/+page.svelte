<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  let order = data.order;
</script>

<svelte:head>
  <title>Order Details - {order.id}</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-8">
  <a href="/" class="p-2 text-md rounded font-bold bg-gray-900 text-white">Back</a>
  <h1 class="text-3xl font-bold text-gray-900 my-6">Order Details</h1>

  {#if order}
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Order Summary -->
      <div class="p-6 border-b border-gray-200">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-sm text-gray-600">Order ID</p>
            <p class="font-medium text-gray-900">{order.id}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Status</p>
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium capitalize
              {order.status === 'delivered'
                ? 'bg-green-100 text-green-800'
                : order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'}"
            >
              {order.status}
            </span>
          </div>
          <div>
            <p class="text-sm text-gray-600">Shipping Address</p>
            <p class="font-medium text-gray-900">
              {order.shippingAddress.country}, {order.shippingAddress.city}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Total Amount</p>
            <p class="font-medium text-gray-900">${order.totalAmount}</p>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
        <div class="space-y-4">
          {#each order.items as item}
            <div
              class="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
            >
              <div class="flex-1">
                <p class="font-medium text-gray-900">{item.productName}</p>
                <p class="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p class="font-medium text-gray-900">${item.pricePerUnit}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <div class="bg-white shadow-lg rounded-lg p-6">
      <p class="text-gray-600 text-center">No order found.</p>
    </div>
  {/if}
</div>
