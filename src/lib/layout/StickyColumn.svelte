<script lang="ts">
  import { onMount } from 'svelte';
  import { media } from '$lib/media-query.store';

  export let reverse = false;
  export let fitOnScreenContent = false;
  let _class = '';
  export { _class as class };

  let ctaHeight: number;
  $: ctaOffset = !$media.md && ctaHeight ? ctaHeight : 0;

  let root: HTMLElement;

  onMount(() => {
    root = document.querySelector<HTMLElement>(`[data-theme-context="root"]`);

    return () => {
      root.style.paddingBottom = '0px';
    };
  });

  $: root && (root.style.paddingBottom = `${ctaOffset}px`);
</script>

<div class="grid {_class}" class:reverse>
  <div class="w-big" style="background: var(--sticky-scroll-bg)">
    <div style={fitOnScreenContent ? `height: calc(100vh - ${ctaOffset}px - var(--header-height))` : ''}>
      <slot name="onscreen-content" />
    </div>
  </div>
  <div
    class="sticky-content-wrapper flex flex-col md:sticky w-small"
    class:order-first={reverse}
    style="background: var(--sticky-content-bg);"
  >
    <div class="sticky-content" style={$media.md ? `height: calc(100vh - ${ctaHeight}px - var(--header-height));` : ''}>
      <slot name="sticky-content" />
    </div>
    <div class="fixed bottom-0 left-0 right-0 md:static z-40">
      <div bind:clientHeight={ctaHeight}>
        <slot name="sticky-cta" />
      </div>
    </div>
  </div>
  {#if $$slots.tabs}
    <div class="w-big">
      <slot name="tabs" />
    </div>
  {/if}
</div>

<style lang="postcss">
  .grid {
    --container-padding: calc(50% - var(--container-max-width) / 2);
    --container-big-width: calc(var(--container-padding) + var(--split) * var(--container-max-width));
    --container-big-padding: calc(100% - var(--split) * var(--container-max-width));
    --container-small-width: calc(var(--container-padding) + (1 - var(--split)) * var(--container-max-width));
    --container-small-padding: calc(100% - (1 - var(--split)) * var(--container-max-width));
  }

  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @screen md {
    .grid {
      --split: 0.5;
    }

    .grid {
      grid-template-columns: var(--container-big-width) var(--container-small-width);
    }

    .grid.reverse {
      grid-template-columns: var(--container-small-width) var(--container-big-width);
    }

    .grid .w-big {
      padding-left: var(--container-big-padding);
      padding-right: 0;
    }
    .grid .w-small {
      padding-left: 0;
      padding-right: var(--container-small-padding);
    }

    .grid.reverse .w-big {
      padding-left: 0;
      padding-right: var(--container-big-padding);
    }
    .grid.reverse .w-small {
      padding-left: var(--container-small-padding);
      padding-right: 0;
    }
  }

  @screen lg {
    .grid {
      --split: var(--lg-split, 0.65);
    }
  }

  @screen xl {
    .grid {
      --split: var(--xl-split, 0.65);
    }
  }

  @screen 2xl {
    .grid {
      --split: var(--2xl-split, 0.65);
    }
  }
  .sticky-content-wrapper {
    top: var(--header-height);
  }

  @screen md {
    .sticky-content-wrapper {
      min-height: calc(100vh - var(--header-height));
      height: fit-content;
    }
    .sticky-content {
      flex: 1;
    }
  }

  @screen 2xl {
    .sku .sticky-content-wrapper {
      min-height: var(--sku-grid-2xl-sticky-content-wrapper-min-height, calc(100vh - var(--header-height)));
      top: var(--sku-grid-2xl-sticky-content-wrapper-top, var(--header-height));
    }
  }

  @media (min-width: 2000px) {
    .sku .sticky-content-wrapper {
      top: var(--sku-grid-2k-sticky-content-wrapper-top, var(--header-height));
    }
  }
</style>
