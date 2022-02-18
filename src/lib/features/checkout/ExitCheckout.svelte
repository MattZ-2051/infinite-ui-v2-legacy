<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  export let onReturn: () => void;
  export let onExit: () => void;
</script>

<div class="flex flex-col max-w-sm justify-center justify-self-center	">
  <span class="text-3xl mb-10">Exit checkout?</span>
  <span class="mb-10">If you exit before the payment process is completed, any progress you made will be lost.</span>
  <Button variant="brand" on:click={onReturn}>Return to checkout</Button>
  <span class="mt-6 text-center text-gray-500 hover:underline cursor-pointer hover:text-gray-800" on:click={onExit}
    >Exit and back to Marketplace</span
  >
</div>
