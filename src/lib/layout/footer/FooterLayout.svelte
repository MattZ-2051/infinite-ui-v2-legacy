<div class="separator" />
<footer class="container flex flex-col gap-y-8 justify-evenly items-center text-sm md:flex-row md:justify-between">
  <div class="flex flex-wrap items-center justify-center gap-4 md:gap-4">
    <slot name="start" />
  </div>
  <span class="px-4 flex flex-wrap gap-1 justify-center">
    <slot name="copyright" />
  </span>
  <div class="flex flex-wrap items-center justify-center text-center gap-x-8 gap-y-4 md:gap-5">
    <slot name="end" />
  </div>
</footer>

<style lang="postcss">
  footer {
    color: var(--footer-color);
    background-color: var(--footer-bg-color);
  }
  .separator {
    @apply h-px w-full;
    background: var(--header-separator-bg-color);
  }
</style>
