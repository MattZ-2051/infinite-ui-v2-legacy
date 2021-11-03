<script lang="ts">
  import { mdiPencil } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';

  export let loading = false;
  const size = '18px';
</script>

<button
  type="button"
  class="rounded-full w-6 h-6  text-black bg-white flex items-center justify-center"
  on:click
  disabled={loading}
>
  {#if loading}
    <DualRingLoader --lds-size={size} />
  {:else}
    <Icon path={mdiPencil} {size} />
  {/if}
  <span class="sr-only">Edit</span>
</button>
