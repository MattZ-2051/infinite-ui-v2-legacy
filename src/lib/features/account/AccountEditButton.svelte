<script lang="ts">
  import PencilIcon from '$lib/features/account/assets/PencilIcon.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';

  export let loading = false;
  const size = '18px';
</script>

<button
  type="button"
  class="rounded-full text-black bg-white flex items-center justify-center button-properties"
  on:click
  disabled={loading}
>
  {#if loading}
    <DualRingLoader --lds-size={size} />
  {:else}
    <PencilIcon {size} />
  {/if}
  <span class="sr-only">Edit</span>
</button>

<style lang="postcss">
  .button-properties {
    width: var(--edit-picture-button-width, 1.5rem);
    height: var(--edit-picture-button-height, 1.5rem);
    box-shadow: var(--edit-picture-shadow, none);
  }
</style>
