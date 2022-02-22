<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  export let onReturn: () => void;
  export let onExit: () => void;
</script>

<div class="flex flex-col text-center justify-center justify-self-center xl:max-w-sm xl:text-left">
  <span class="text-xl mb-8 xl:text-3xl xl:mb-10">Exit checkout?</span>
  <span class="text-sm mb-8 xl:text-base xl:mb-10"
    >If you exit before the payment process is completed, any progress you made will be lost.</span
  >
  <Button variant="brand" on:click={onReturn}>Return to checkout</Button>
  <span class="mt-6 text-center text-gray-500 hover:underline cursor-pointer hover:text-gray-800" on:click={onExit}
    >Exit and back to Marketplace</span
  >
</div>
