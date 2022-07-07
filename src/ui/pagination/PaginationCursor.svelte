<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import ChevronLeft from '$ui/pagination/assets/ChevronLeft.svelte';
  import DoubleChevronLeft from '$ui/pagination/assets/DoubleChevronLeft.svelte';
  import PaginationItem from './PaginationItem.svelte';

  export let hasNext = false;
  export let hasPrevious = false;
  export let total = 1;
  export let page = 1;
  export let perPage = 9;
  export let loading = false;

  $: pages = Math.ceil(total / perPage);
  const dispatch = createEventDispatcher();

  let timeout = undefined;
  let localLoading = false;

  const debounceReEnable = () => {
    localLoading = true;
    timeout = setTimeout(() => {
      localLoading = false;
    }, 1000);
  };

  const onFirstPage = () => {
    debounceReEnable();
    dispatch('firstPage');
  };

  const onPrevious = () => {
    debounceReEnable();
    dispatch('prev', { page: page - 1 });
  };

  const onNext = () => {
    debounceReEnable();
    dispatch('next', { page: page + 1 });
  };

  onDestroy(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  $: clickDisabled = localLoading || loading;
</script>

{#if (hasNext || hasPrevious) && pages !== undefined && page !== undefined}
  <nav {...$$restProps}>
    <ul class="flex items-center gap-2 md:gap-3">
      {#if page > 1}
        <PaginationItem on:click={onFirstPage}>
          <slot name="previous"><DoubleChevronLeft /></slot>
        </PaginationItem>
        <PaginationItem on:click={onPrevious} disabled={!hasPrevious || clickDisabled || page === 1}>
          <slot name="previous"><ChevronLeft /><span>Prev</span></slot>
        </PaginationItem>
      {/if}
      <div class="inline-block opacity-50">{`${page} of ${pages}`}</div>
      {#if page < pages}
        <PaginationItem on:click={onNext} disabled={!hasNext || clickDisabled || page === pages}>
          <slot name="next"><span>Next</span><ChevronLeft class="rotate-180" /></slot>
        </PaginationItem>
      {/if}
    </ul>
  </nav>
{/if}
