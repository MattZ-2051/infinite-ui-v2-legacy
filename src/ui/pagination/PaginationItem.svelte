<script lang="ts">
  export let active = false;
  export let disabled = false;
</script>

<li class="text-lg rounded-full w-8 h-8" class:disabled class:active>
  <button
    type="button"
    {disabled}
    on:click
    class="flex items-center justify-center w-full h-full rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
  >
    <slot /></button
  >
</li>

<style>
  li {
    color: var(--pagination-color);
  }

  li:hover:not(.disabled):not(.active) {
    @apply bg-gray-200;
  }

  .disabled {
    opacity: 50%;
  }

  .active {
    color: var(--pagination-color-active);
    background-color: var(--pagination-background-color-active);
  }
</style>
