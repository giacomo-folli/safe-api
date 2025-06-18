<script>
  import "../app.css";
</script>

<div class="min-h-screen bg-gray-100">
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-900">
          <a href="/" class="hover:text-blue-600">Type-Safe E-commerce</a>
        </h1>

        <div class="flex space-x-4">
          <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/orders/new" class="text-gray-600 hover:text-gray-900"
            >Create Order</a
          >
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-6xl mx-auto px-4 py-8">
    <slot />
  </main>
</div>
