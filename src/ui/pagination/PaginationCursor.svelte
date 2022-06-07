<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import chevronLeft from '$ui/pagination/assets/chevron-left';
  import Icon from '$ui/icon/Icon.svelte';
  import PaginationItem from './PaginationItem.svelte';

  export let hasNext = false;
  export let hasPrevious = false;

  const dispatch = createEventDispatcher();
</script>

{#if hasNext || hasPrevious}
  <nav {...$$restProps}>
    <ul class="flex items-center md:gap-3">
      <PaginationItem on:click={() => dispatch('prev')} disabled={!hasPrevious}>
        <slot name="previous"><Icon path={chevronLeft} /><span class="sr-only">Previous</span></slot>
      </PaginationItem>
      <PaginationItem on:click={() => dispatch('next')} disabled={!hasNext}>
        <slot name="next"><Icon path={chevronLeft} flip="h" /><span class="sr-only">Next</span></slot>
      </PaginationItem>
    </ul>
  </nav>
{/if}
