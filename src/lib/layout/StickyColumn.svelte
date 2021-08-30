<script lang="ts">
  import { media } from '$lib/media-query.store';

  export let reverse = false;
  export let fitOnScreenContent = false;

  let ctaHeight: number;
  $: ctaOffset = !$media.md && ctaHeight ? ctaHeight : 0;
</script>

<div class="container py-0">
  <div class="flex flex-wrap flex-col items-start {reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:justify-between">
    <div class="w-full md:w-2/3">
      <div style={fitOnScreenContent ? `height: calc(100vh - ${ctaOffset}px - var(--header-height))` : ''}>
        <slot name="onscreen-content" />
      </div>
    </div>
    <div class="flex flex-col w-full md:w-1/3 md:sticky" style="top: var(--header-height);">
      <div style="height: calc(100vh - {ctaHeight}px - var(--header-height))">
        <slot name="sticky-content" />
      </div>
      <div class="fixed bottom-0 left-0 right-0 md:static">
        <div bind:clientHeight={ctaHeight}>
          <slot name="sticky-cta" />
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/3">
      <slot name="tabs" />
    </div>
  </div>

  <div style="margin-bottom: {ctaOffset}">
    <slot name="offscreen-content" />
  </div>
</div>
