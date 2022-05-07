<script lang="ts">
  import { fly } from 'svelte/transition';
  import NftGateKeepList from '$lib/features/gateKeeping/NftGateKeepList.svelte';

  export let show = false;
</script>

{#if show}
  <nav class="nav md:w-128" transition:fly={{ x: 560, opacity: 1 }}>
    <NftGateKeepList />
  </nav>
{/if}

<style>
  @media only screen and (max-width: 768px) {
    .nav {
      width: 100%;
    }
  }
  .nav {
    position: fixed;
    right: 0;
    height: 100%;
    background: var(--inverse-color, black);
    overflow-y: auto;
    z-index: 100;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
  }
  .nav::-webkit-scrollbar {
    display: none;
  }
</style>
