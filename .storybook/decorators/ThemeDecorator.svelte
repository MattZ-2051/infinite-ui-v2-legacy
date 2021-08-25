<div class="theme-container">
  <slot />
</div>

<style lang="postcss">
  .theme-container {
    background-color: var(--bg-color);
    color: var(--color);
    height: calc(100vh - 2rem);
  }
</style>
