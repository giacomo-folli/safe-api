<script lang="ts">
  import type { CreateOrder } from '@ecommerce/shared'
  import { createEventDispatcher } from 'svelte'
  import { validateOrder } from '$lib/utils/validation'

  const dispatch = createEventDispatcher<{ submit: CreateOrder }>()

  let formData: CreateOrder = {
    customerId: 1,
    items: [{ productId: 1, quantity: 1, pricePerUnit: 29.99 }],
    shippingAddress: {
      street: '',
      apartment: '',
      city: '',
      postalCode: '',
      country: 'US'
    },
    paymentMethod: 'credit_card'
  }

  let errors: Record<string, string> = {}
  let isSubmitting = false

  function addItem() {
    formData.items = [...formData.items, { productId: 1, quantity: 1, pricePerUnit: 0 }]
  }

  function removeItem(index: number) {
    formData.items = formData.items.filter((_, i) => i !== index)
  }

  function handleSubmit() {
    const validation = validateOrder(formData)
    
    if (!validation.success) {
      errors = validation.errors
      return
    }
    
    errors = {}
    isSubmitting = true
    dispatch('submit', validation.data)
  }

  $: totalAmount = formData.items.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0)
</script>

<div class="max-w-2xl mx-auto p-6">
  <h2 class="text-2xl font-bold mb-6">Create New Order</h2>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <!-- Customer ID -->
    <div>
      <label for="customerId" class="block text-sm font-medium mb-1">Customer ID</label>
      <input 
        id="customerId"
        type="number" 
        bind:value={formData.customerId} 
        min="1"
        class="w-full p-2 border border-gray-300 rounded-md"
        class:border-red-500={errors.customerId}
      />
      {#if errors.customerId}
        <p class="text-red-500 text-sm mt-1">{errors.customerId}</p>
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
            />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1">Quantity</label>
            <input 
              type="number" 
              bind:value={item.quantity} 
              min="1" 
              max="99"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1">Price per Unit</label>
            <input 
              type="number" 
              bind:value={item.pricePerUnit} 
              min="0.01" 
              step="0.01"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button 
            type="button" 
            on:click={() => removeItem(index)}
            class="self-end px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            disabled={formData.items.length === 1}
          >
            Remove
          </button>
        </div>
      {/each}
      
      {#if errors.items}
        <p class="text-red-500 text-sm mt-1">{errors.items}</p>
      {/if}
    </div>

    <!-- Shipping Address -->
    <div>
      <h3 class="text-lg font-medium mb-3">Shipping Address</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label for="street" class="block text-sm font-medium mb-1">Street Address</label>
          <input 
            id="street"
            type="text" 
            bind:value={formData.shippingAddress.street} 
            placeholder="123 Main St"
            class="w-full p-2 border border-gray-300 rounded-md"
            class:border-red-500={errors['shippingAddress.street']}
          />
          {#if errors['shippingAddress.street']}
            <p class="text-red-500 text-sm mt-1">{errors['shippingAddress.street']}</p>
          {/if}
        </div>
        
        <div>
          <label for="apartment" class="block text-sm font-medium mb-1">Apartment (Optional)</label>
          <input 
            id="apartment"
            type="text" 
            bind:value={formData.shippingAddress.apartment} 
            placeholder="Apt 4B"
            class="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label for="city" class="block text-sm font-medium mb-1">City</label>
          <input 
            id="city"
            type="text" 
            bind:value={formData.shippingAddress.city} 
            placeholder="New York"
            class="w-full p-2 border border-gray-300 rounded-md"
            class:border-red-500={errors['shippingAddress.city']}
          />
          {#if errors['shippingAddress.city']}
            <p class="text-red-500 text-sm mt-1">{errors['shippingAddress.city']}</p>
          {/if}
        </div>
        
        <div>
          <label for="postalCode" class="block text-sm font-medium mb-1">Postal Code</label>
          <input 
            id="postalCode"
            type="text" 
            bind:value={formData.shippingAddress.postalCode} 
            placeholder="12345"
            class="w-full p-2 border border-gray-300 rounded-md"
            class:border-red-500={errors['shippingAddress.postalCode']}
          />
          {#if errors['shippingAddress.postalCode']}
            <p class="text-red-500 text-sm mt-1">{errors['shippingAddress.postalCode']}</p>
          {/if}
        </div>
        
        <div>
          <label for="country" class="block text-sm font-medium mb-1">Country Code</label>
          <select 
            id="country"
            bind:value={formData.shippingAddress.country}
            class="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Payment Method -->
    <div>
      <label for="paymentMethod" class="block text-sm font-medium mb-1">Payment Method</label>
      <select 
        id="paymentMethod"
        bind:value={formData.paymentMethod}
        class="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="credit_card">Credit Card</option>
        <option value="paypal">PayPal</option>
        <option value="apple_pay">Apple Pay</option>
      </select>
    </div>

    <!-- Order Summary -->
    <div class="bg-gray-50 p-4 rounded-md">
      <h3 class="text-lg font-medium mb-2">Order Summary</h3>
      <p class="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
    </div>

    <!-- Submit Button -->
    <button 
      type="submit" 
      disabled={isSubmitting}
      class="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? 'Creating Order...' : 'Create Order'}
    </button>
  </form>
</div>

<style>
  .border-red-500 {
    border-color: #ef4444;
  }
</style>
