<script lang="ts">
  import { browser } from '$app/env';
  import { media } from '$lib/media-query.store';

  export let reverse = false;
  export let fitOnScreenContent = false;

  let ctaHeight: number;
  $: ctaOffset = !$media.md && ctaHeight ? ctaHeight : 0;

  $: if (browser && $$slots['sticky-cta']) {
    const root = document.querySelector<HTMLElement>(`[data-theme-context="root"]`);
    if (root) {
      root.style.paddingBottom = `${ctaOffset}px`;
    }
  }
</script>

<div class="container py-0">
  <div
    class="flex flex-wrap items-start {reverse ? 'flex-col-reverse' : 'flex-col'} {reverse
      ? `md:flex-row-reverse`
      : `md:flex-row`} md:justify-between"
  >
    <div class="w-full md:w-1/2 lg:w-2/3">
      <div style={fitOnScreenContent ? `height: calc(100vh - ${ctaOffset}px - var(--header-height))` : ''}>
        <slot name="onscreen-content" />
      </div>
    </div>
    <div class="sticky-content-wrapper flex flex-col w-full md:w-1/2 lg:w-1/3 md:sticky">
      <div class="sticky-content">
        <slot name="sticky-content" />
      </div>
      <div class="fixed bottom-0 left-0 right-0 md:static z-50">
        <div bind:clientHeight={ctaHeight}>
          <slot name="sticky-cta" />
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 lg:w-2/3">
      <slot name="tabs" />
    </div>
  </div>

  <slot name="offscreen-content" />
</div>

<style lang="postcss">
  .sticky-content-wrapper {
    top: var(--header-height);
  }

  @screen md {
    .sticky-content-wrapper {
      height: calc(100vh - var(--header-height));
    }
    .sticky-content {
      flex: 1;
    }
  }
</style>
