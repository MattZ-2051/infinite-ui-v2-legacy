<div class="theme-container" data-theme-context="root">
  <slot />
</div>

<style lang="postcss">
  .theme-container {
    overflow: auto;
    background-color: var(--bg-color);
    color: var(--color);
    height: calc(100vh - 2rem);
  }
</style>
