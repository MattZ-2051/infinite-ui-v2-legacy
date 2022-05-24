<script lang="ts">
  import clsx from 'clsx';
  import arrowRight from '$lib/features/sku/assets/arrow-right';
  import Icon from '$ui/icon/Icon.svelte';

  /**
   * The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node.
   */
  export let href = undefined;

  /**
   * The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node.
   */
  export let action = undefined;

  let _class = '';
  /**
   * Extra classes.
   */
  export { _class as class };

  export let polling = false;

  $: classes = clsx(
    'sticky-cta group block w-full text-left px-[8%] py-5 font-normal',
    action || href ? 'flex items-center' : '',
    polling && 'opacity-50',
    _class
  );

  // 400 as default scale to prevent too much abrupt scaling
  let contentWidth = 400;
</script>

{#if href}
  <a {href} class={classes} {...$$restProps}
    ><div
      class="grow shrink-0 basis-5/6"
      bind:clientWidth={contentWidth}
      style={`--price-box-container-width: ${contentWidth}`}
    >
      <slot {contentWidth} />
    </div>

    <div class="pl-[5%] flex-1 basis-1/6">
      <Icon
        class="transform transition-transform duration-150 group-hover:-rotate-45"
        path={arrowRight}
        size="clamp(2.5rem, 100%, 4rem)"
      />
    </div>
  </a>
{:else if action}
  <button type="button" class={classes} {...$$restProps} on:click disabled={polling}
    ><div
      class="grow shrink-0 basis-5/6"
      bind:clientWidth={contentWidth}
      style={`--price-box-container-width: ${contentWidth}`}
    >
      <slot {contentWidth} />
    </div>

    <div class="pl-[5%] flex-1 basis-1/6">
      <Icon
        class="transform transition-transform duration-150 group-hover:-rotate-45"
        path={arrowRight}
        size="clamp(2.5rem, 100%, 4rem)"
      />
    </div></button
  >
{:else}
  <div
    class={classes}
    {...$$restProps}
    bind:clientWidth={contentWidth}
    style={`--price-box-container-width: ${contentWidth}`}
  >
    <slot {contentWidth} />
  </div>
{/if}

<style lang="postcss">
  @media (max-width: 768px) {
    .from-creator-custom {
      border-radius: var(--from-creator-button-border-radius, 0px);
    }
  }
</style>
