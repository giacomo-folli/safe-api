<script lang="ts">
  import type { CreateOrder } from "@ecommerce/shared";
  import { enhance } from "$app/forms";

  interface ActionData {
    success: boolean;
    data?: CreateOrder;
    errors?: Record<string, string>;
    message?: string;
  }

  export let form: ActionData | undefined = undefined;

  let formData: CreateOrder = {
    customerId: 1,
    items: [{ productId: 1, quantity: 1, pricePerUnit: 29.99 }],
    shippingAddress: {
      street: "",
      apartment: "",
      city: "",
      postalCode: "",
      country: "US",
    },
    paymentMethod: "credit_card",
  };

  // Restore form data if there was an error
  $: if (form?.data) {
    formData = form.data as CreateOrder;
  }

  function addItem() {
    formData.items = [
      ...formData.items,
      { productId: 1, quantity: 1, pricePerUnit: 0 }
    ];
  }

  function removeItem(index: number) {
    formData.items = formData.items.filter((_, i) => i !== index);
  }

  $: totalAmount = formData.items.reduce(
    (sum, item) => sum + item.quantity * item.pricePerUnit,
    0
  );

  let isSubmitting = false;

  function handleSubmit() {
    isSubmitting = true;
    return async ({ update }: { update: () => Promise<void> }) => {
      await update();
      isSubmitting = false;
    };
  }
</script>

<div class="max-w-2xl mx-auto p-6">
  <h2 class="text-2xl font-bold mb-6">Create New Order</h2>

  <form
    method="POST"
    use:enhance={handleSubmit}
    class="space-y-6"
  >
    <!-- Hidden fields for complex data -->
    <input type="hidden" name="items" value={JSON.stringify(formData.items)} />
    <input type="hidden" name="shippingAddress" value={JSON.stringify(formData.shippingAddress)} />

    <!-- Customer ID -->
    <div>
      <label for="customerId" class="block text-sm font-medium mb-1"
        >Customer ID</label
      >
      <input
        id="customerId"
        name="customerId"
        type="number"
        bind:value={formData.customerId}
        min="1"
        class="w-full p-2 border border-gray-300 rounded-md"
        class:border-red-500={form?.errors?.customerId}
      />
      {#if form?.errors?.customerId}
        <p class="text-red-500 text-sm mt-1">{form.errors.customerId}</p>
      {/if}
    </div>

    <!-- Items -->
    <div>
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-medium">Order Items</h3>
        <button
          type="button"
          on:click={addItem}
          class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      {#each formData.items as item, index}
        <div class="flex gap-2 mb-2 p-3 border border-gray-200 rounded-md">
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1">Product ID</label>
            <input
              type="number"
              bind:value={item.productId}
              min="1"
              class="w-full p-2 border border-gray-300 rounded-md"
              class:border-red-500={form?.errors?.[`items.${index}.productId`]}
            />
            {#if form?.errors?.[`items.${index}.productId`]}
              <p class="text-red-500 text-sm mt-1">{form.errors[`items.${index}.productId`]}</p>
            {/if}
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              bind:value={item.quantity}
              min="1"
              max="99"
              class="w-full p-2 border border-gray-300 rounded-md"
              class:border-red-500={form?.errors?.[`items.${index}.quantity`]}
            />
            {#if form?.errors?.[`items.${index}.quantity`]}
              <p class="text-red-500 text-sm mt-1">{form.errors[`items.${index}.quantity`]}</p>
            {/if}
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium mb-1">Price Per Unit</label>
            <input
              type="number"
              bind:value={item.pricePerUnit}
              min="0.01"
              step="0.01"
              class="w-full p-2 border border-gray-300 rounded-md"
              class:border-red-500={form?.errors?.[`items.${index}.pricePerUnit`]}
            />
            {#if form?.errors?.[`items.${index}.pricePerUnit`]}
              <p class="text-red-500 text-sm mt-1">{form.errors[`items.${index}.pricePerUnit`]}</p>
            {/if}
          </div>

          <button
            type="button"
            on:click={() => removeItem(index)}
            class="self-end px-3 py-2 text-red-500 hover:text-red-600"
            title="Remove item"
          >
            ✕
          </button>
        </div>
      {/each}
      
      {#if form?.errors?.items}
        <p class="text-red-500 text-sm mt-1">{form.errors.items}</p>
      {/if}
    </div>

    <!-- Shipping Address -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Shipping Address</h3>
      
      <div>
        <label for="street" class="block text-sm font-medium mb-1">Street</label>
        <input
          id="street"
          type="text"
          bind:value={formData.shippingAddress.street}
          class="w-full p-2 border border-gray-300 rounded-md"
          class:border-red-500={form?.errors?.['shippingAddress.street']}
        />
        {#if form?.errors?.['shippingAddress.street']}
          <p class="text-red-500 text-sm mt-1">{form.errors['shippingAddress.street']}</p>
        {/if}
      </div>

      <div>
        <label for="apartment" class="block text-sm font-medium mb-1">Apartment (optional)</label>
        <input
          id="apartment"
          type="text"
          bind:value={formData.shippingAddress.apartment}
          class="w-full p-2 border border-gray-300 rounded-md"
          class:border-red-500={form?.errors?.['shippingAddress.apartment']}
        />
        {#if form?.errors?.['shippingAddress.apartment']}
          <p class="text-red-500 text-sm mt-1">{form.errors['shippingAddress.apartment']}</p>
        {/if}
      </div>

      <div>
        <label for="city" class="block text-sm font-medium mb-1">City</label>
        <input
          id="city"
          type="text"
          bind:value={formData.shippingAddress.city}
          class="w-full p-2 border border-gray-300 rounded-md"
          class:border-red-500={form?.errors?.['shippingAddress.city']}
        />
        {#if form?.errors?.['shippingAddress.city']}
          <p class="text-red-500 text-sm mt-1">{form.errors['shippingAddress.city']}</p>
        {/if}
      </div>

      <div>
        <label for="postalCode" class="block text-sm font-medium mb-1">Postal Code</label>
        <input
          id="postalCode"
          type="text"
          bind:value={formData.shippingAddress.postalCode}
          class="w-full p-2 border border-gray-300 rounded-md"
          class:border-red-500={form?.errors?.['shippingAddress.postalCode']}
        />
        {#if form?.errors?.['shippingAddress.postalCode']}
          <p class="text-red-500 text-sm mt-1">{form.errors['shippingAddress.postalCode']}</p>
        {/if}
      </div>

      <div>
        <label for="country" class="block text-sm font-medium mb-1">Country</label>
        <select
          id="country"
          bind:value={formData.shippingAddress.country}
          class="w-full p-2 border border-gray-300 rounded-md"
          class:border-red-500={form?.errors?.['shippingAddress.country']}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
        </select>
        {#if form?.errors?.['shippingAddress.country']}
          <p class="text-red-500 text-sm mt-1">{form.errors['shippingAddress.country']}</p>
        {/if}
      </div>
    </div>

    <!-- Payment Method -->
    <div>
      <label for="paymentMethod" class="block text-sm font-medium mb-1">Payment Method</label>
      <select
        id="paymentMethod"
        name="paymentMethod"
        bind:value={formData.paymentMethod}
        class="w-full p-2 border border-gray-300 rounded-md"
        class:border-red-500={form?.errors?.paymentMethod}
      >
        <option value="credit_card">Credit Card</option>
        <option value="paypal">PayPal</option>
        <option value="apple_pay">Apple Pay</option>
      </select>
      {#if form?.errors?.paymentMethod}
        <p class="text-red-500 text-sm mt-1">{form.errors.paymentMethod}</p>
      {/if}
    </div>

    <!-- Total Amount -->
    <div class="text-right text-xl font-bold">
      Total: ${totalAmount.toFixed(2)}
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <button
        type="submit"
        class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Order...' : 'Create Order'}
      </button>
    </div>
  </form>
</div>

<style>
  .border-red-500 {
    border-color: #ef4444;
  }
</style>
