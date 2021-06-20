<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {
    mdiChevronDoubleLeft,
    mdiChevronDoubleRight,
    mdiChevronLeft,
    mdiChevronRight,
  } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import PaginationItem from './PaginationItem.svelte';
  import PaginationEllipsis from './PaginationEllipsis.svelte';

  export let total;
  export let perPage = 10;
  export let page = 1;
  export let boundaryLinks = false;
  export let previousButtons = true;
  export let siblingCount = 1;
  export let boundaryCount = 1;

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
  };

  $: pages = Math.ceil((total || 0) / perPage);

  $: startPages = range(1, Math.min(boundaryCount, pages));
  $: endPages = range(Math.max(pages - boundaryCount + 1, boundaryCount + 1), pages);

  $: siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      pages - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  $: siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : pages - 1
  );

  $: siblingPages = range(siblingsStart, siblingsEnd);

  $: isFirstPage = page === 1;
  $: isLastPage = page === pages;

  const dispatch = createEventDispatcher();

  function go(pageNumber: number) {
    page = pageNumber;
    dispatch('change', { value: pageNumber });
  }
</script>

{#if pages > 1}
  <nav {...$$restProps}>
    <ul class="flex items-center gap-3">
      {#if boundaryLinks}
        <PaginationItem on:click={() => go(1)} disabled={isFirstPage}>
          <slot name="first"><Icon path={mdiChevronDoubleLeft} /></slot>
        </PaginationItem>
      {/if}
      {#if previousButtons}
        <PaginationItem on:click={() => go(page - 1)} disabled={isFirstPage}>
          <slot name="previous"><Icon path={mdiChevronLeft} /></slot>
        </PaginationItem>
      {/if}

      <!-- First pages -->
      {#each startPages as n}
        <PaginationItem active={n === page} on:click={() => go(n)}>
          {n}</PaginationItem
        >
      {/each}

      <!-- dots start -->
      {#if siblingPages[0] - (boundaryCount + 1) === 1}
        <PaginationItem
          active={siblingPages[0] - 1 === page}
          on:click={() => go(siblingPages[0] - 1)}
          >{siblingPages[0] - 1}
        </PaginationItem>
      {:else if siblingPages[0] - (boundaryCount + 1) > 1}
        <PaginationEllipsis />
      {/if}

      <!-- current and siblings -->
      {#each siblingPages as n}
        <PaginationItem active={n === page} on:click={() => go(n)}>
          {n}
        </PaginationItem>
      {/each}

      <!-- dots end -->
      {#if pages - boundaryCount - siblingPages[siblingPages.length - 1] === 1}
        <PaginationItem
          active={siblingPages[siblingPages.length - 1] + 1 === page}
          on:click={() => go(siblingPages[siblingPages.length - 1] + 1)}
          >{siblingPages[siblingPages.length - 1] + 1}
        </PaginationItem>
      {:else if pages - boundaryCount - siblingPages[siblingPages.length - 1] > 1}
        <PaginationEllipsis />
      {/if}

      <!-- Last pages -->
      {#each endPages as n}
        <PaginationItem active={n === page} on:click={() => go(n)}>
          {n}
        </PaginationItem>
      {/each}

      {#if previousButtons}
        <PaginationItem on:click={() => go(page + 1)} disabled={isLastPage}>
          <slot name="next"><Icon path={mdiChevronRight} /></slot>
        </PaginationItem>
      {/if}
      {#if boundaryLinks}
        <PaginationItem on:click={() => go(pages)} disabled={isLastPage}>
          <slot name="last"><Icon path={mdiChevronDoubleRight} /></slot>
        </PaginationItem>
      {/if}
    </ul>
  </nav>
{/if}
