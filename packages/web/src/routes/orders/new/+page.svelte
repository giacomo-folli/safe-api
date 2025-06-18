<script lang="ts">
  import { enhance } from "$app/forms";
  import OrdersForm from "$lib/components/OrdersForm.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div class="max-w-5xl mx-auto p-6">
  {#if form?.message && !form.success}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
      <p>{form.message}</p>
    </div>
  {/if}

  <OrdersForm {form} />
</div>
