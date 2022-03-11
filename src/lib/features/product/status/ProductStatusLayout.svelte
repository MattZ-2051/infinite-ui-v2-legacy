<div
  class="flex flex-col lg:flex-row w-full h-full lg:rounded-lg overflow-hidden whitespace-nowrap"
  style="background-color: var(--product-status-bg-color, #313131);"
>
  <div class="flex flex-grow flex-col lg:flex-row lg:px-6 py-2 lg:py-4 justify-center lg:justify-between items-center">
    <slot />
  </div>
  <slot name="action" />
</div>
