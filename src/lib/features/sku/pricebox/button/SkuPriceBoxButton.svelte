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
    'sticky-cta group block w-full text-left px-8 py-5 font-normal',
    action || href ? 'flex items-center' : '',
    polling && 'opacity-50',
    _class
  );
</script>

{#if href}
  <a {href} class={classes} {...$$restProps}
    ><div class="flex-grow"><slot /></div>

    <div class="pl-5 flex-none">
      <Icon class="transform group-hover:-rotate-45" path={arrowRight} size="2.0" />
    </div>
  </a>
{:else if action}
  <button type="button" class={classes} {...$$restProps} on:click disabled={polling}
    ><div class="flex-grow"><slot /></div>

    <div class="pl-5 flex-none">
      <Icon class="transform group-hover:-rotate-45" path={arrowRight} size="2.0" />
    </div></button
  >
{:else}
  <div class={classes} {...$$restProps}><slot /></div>
{/if}
