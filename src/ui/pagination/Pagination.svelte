<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import chevronDoubleLeft from '$ui/pagination/assets/chevron-double-left';
  import chevronLeft from '$ui/pagination/assets/chevron-left';
  import Icon from '$ui/icon/Icon.svelte';
  import PaginationItem from './PaginationItem.svelte';
  import PaginationEllipsis from './PaginationEllipsis.svelte';

  export let total: number;
  export let perPage = 10;
  export let page = 1;
  export let boundaryLinks = false;
  export let previousButtons = true;
  export let siblingCount = 1;
  export let boundaryCount = 1;

  const range = (start: number, end: number) => {
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
    if (pageNumber === page) {
      return;
    }
    page = pageNumber;
    dispatch('change', { value: pageNumber });
  }
</script>

{#if pages > 1}
  <nav {...$$restProps}>
    <ul class="flex items-center gap-3">
      {#if boundaryLinks}
        <PaginationItem on:click={() => go(1)} disabled={isFirstPage}>
          <slot name="first"><Icon path={chevronDoubleLeft} /><span class="sr-only">First</span></slot>
        </PaginationItem>
      {/if}
      {#if previousButtons}
        <PaginationItem on:click={() => go(page - 1)} disabled={isFirstPage}>
          <slot name="previous"><Icon path={chevronLeft} /><span class="sr-only">Previous</span></slot>
        </PaginationItem>
      {/if}

      <!-- First pages -->
      {#each startPages as n}
        <PaginationItem active={n === page} on:click={() => go(n)}>
          {n}</PaginationItem
        >
      {/each}

      <!-- dots start -->
      {#if siblingsStart > boundaryCount + 2}
        <PaginationEllipsis />
      {:else if boundaryCount + 1 < pages - boundaryCount}
        <PaginationItem active={boundaryCount + 1 === page} on:click={() => go(boundaryCount + 1)}
          >{boundaryCount + 1}
        </PaginationItem>
      {/if}

      <!-- current and siblings -->
      {#each siblingPages as n}
        <PaginationItem active={n === page} on:click={() => go(n)}>
          {n}
        </PaginationItem>
      {/each}

      <!-- dots end -->
      {#if siblingsEnd < pages - boundaryCount - 1}
        <PaginationEllipsis />
      {:else if pages - boundaryCount > boundaryCount}
        <PaginationItem active={pages - boundaryCount === page} on:click={() => go(pages - boundaryCount)}
          >{pages - boundaryCount}
        </PaginationItem>
      {/if}

      <!-- Last pages -->
      {#each endPages as n}
        <PaginationItem active={n === page} on:click={() => go(n)}>
          {n}
        </PaginationItem>
      {/each}

      {#if previousButtons}
        <PaginationItem on:click={() => go(page + 1)} disabled={isLastPage}>
          <slot name="next"><Icon path={chevronLeft} flip="h" /><span class="sr-only">Next</span></slot>
        </PaginationItem>
      {/if}
      {#if boundaryLinks}
        <PaginationItem on:click={() => go(pages)} disabled={isLastPage}>
          <slot name="last"><Icon path={chevronDoubleLeft} flip="h" /><span class="sr-only">Last</span></slot>
        </PaginationItem>
      {/if}
    </ul>
  </nav>
{/if}
