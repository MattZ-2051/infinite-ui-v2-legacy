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

<style>
  .menu-item {
    @apply flex-grow;
    @apply font-medium;
    @apply p-2;
    @apply px-4;
    color: var(--menu-item-color);
  }

  .menu-item:hover,
  .menu-item:active {
    @apply rounded-3xl;
    background: var(--menu-item-background-active);
    color: var(--menu-item-color-active);
    cursor: pointer;
  }
</style>
