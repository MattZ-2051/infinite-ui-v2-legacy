<script lang="ts">
  export let active = false;
  export let disabled = false;
</script>

<li
  class="text-base p-1.5 h-8 relative"
  style="border-radius: var(--pagination-active-border-radius, 0px);"
  class:disabled
  class:active
>
  <button
    type="button"
    {disabled}
    on:click
    class="flex items-center justify-center w-full h-full focus:outline-none focus:ring-gray-400 focus:ring-opacity-50 custom-pagination-focus"
  >
    <slot /></button
  >
</li>

<style lang="postcss">
  li {
    @apply transition duration-200;
    color: var(--pagination-color);
  }

  li:hover:not(.disabled):not(.active) {
    color: var(--pagination-color-hover, var(--pagination-color-active));
    background-color: var(--pagination-background-color-hover, var(--pagination-background-color-active));
  }

  .disabled {
    opacity: 50%;
  }

  .active {
    color: var(--pagination-color-active);
    background: var(--pagination-background-color-active);
    z-index: 1;
  }

  li.active::after {
    @apply text-transparent bg-clip-text bg-gradient-to-r;
    --tw-gradient-from: var(--text-pagination-gradient-from, #ffffff);
    --tw-gradient-to: var(--text-pagination-gradient-to, #ffffff);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;
    content: '';
    z-index: -1;
    background: var(--pagination-bg-after-active, var(--pagination-background-color-active));
    border-radius: 999px;
  }

  .custom-pagination-focus:focus {
    outline: var(--pagination-focus-ring, 2px solid var(--gray-400));
  }
</style>
