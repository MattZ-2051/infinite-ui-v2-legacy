<script lang="ts">
  export let href: string = undefined;
</script>

{#if href}
  <a {href} class:menu-item={true} {...$$restProps}>
    <slot />
  </a>
{:else}
  <div class:menu-item={true} {...$$restProps} on:click>
    <slot />
  </div>
{/if}

<style lang="postcss">
  .menu-item {
    @apply flex items-center flex-grow font-medium p-2 px-4;
    color: var(--menu-item-color);
    font-size: var(--menu-item-font-size, 1rem);
  }

  .menu-item:hover,
  .menu-item:active {
    @apply rounded-3xl;
    background: var(--menu-item-background-active);
    color: var(--menu-item-color-active);
    cursor: pointer;
  }
</style>
