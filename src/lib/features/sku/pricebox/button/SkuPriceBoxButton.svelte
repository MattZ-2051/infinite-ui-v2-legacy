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
    'sticky-cta group block w-full text-left px-12 py-5 font-normal',
    action || href ? 'flex items-center' : '',
    polling && 'opacity-50',
    _class
  );
</script>

{#if href}
  <a {href} class={classes} {...$$restProps}
    ><div class="flex-grow"><slot /></div>

    <div class="arrow-icon pl-5 flex-none">
      <Icon
        class="transform transition-transform duration-150 group-hover:-rotate-45"
        path={arrowRight}
        size="var(--arrow-icon-size)"
      />
    </div>
  </a>
{:else if action}
  <button type="button" class={classes} {...$$restProps} on:click disabled={polling}
    ><div class="flex-grow"><slot /></div>

    <div class="arrow-icon pl-5 flex-none">
      <Icon
        class="transform transition-transform duration-150 group-hover:-rotate-45"
        path={arrowRight}
        size="var(--arrow-icon-size)"
      />
    </div></button
  >
{:else}
  <div class={classes} {...$$restProps}><slot /></div>
{/if}

<style lang="postcss">
  .arrow-icon {
    --arrow-icon-size: 4rem;
  }

  @media screen and (min-width: 768px) and (max-height: 920px) {
    .arrow-icon {
      --arrow-icon-size: 3rem;
    }
  }
  @media (max-width: 768px) {
    .from-creator-custom {
      border-radius: var(--from-creator-button-border-radius, 0px);
    }
  }
</style>
