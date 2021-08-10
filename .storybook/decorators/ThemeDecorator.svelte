<div class="theme-container gap-4 flex flex-wrap">
  <div class="theme-default theme-panel items-stretch flex-1">
    <slot />
  </div>
  <div class="theme-dark theme-panel items-stretch flex-1">
    <slot />
  </div>
</div>

<style>
  .theme-container {
    height: calc(100vh - 2rem);
  }

  .theme-panel {
    background-color: var(--main-bg-color);
  }
</style>
