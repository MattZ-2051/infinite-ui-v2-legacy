<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let isOpen: boolean;

  const dispatch = createEventDispatcher();
</script>

<button type="button" class:open={isOpen} on:click={() => dispatch('toggle', !isOpen)} {...$$restProps}>
  <span>Menu</span>
</button>

<style>
  button {
    border: none;
    width: 30px;
    height: 24px;
    padding: 0;
    outline: none;
    position: relative;
    @apply z-menu;
  }

  button::before,
  button::after,
  button span {
    background: var(--sidebar-toggle-color, currentColor);
  }

  button::before,
  button::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    left: 0;
    top: 50%;
    transform-origin: 50% 50%;
    transition: transform 0.5s;
  }

  button span {
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    overflow: hidden;
    text-indent: 200%;
    transition: opacity 0.25s;
  }

  button::before {
    transform: translate3d(0, -10px, 0);
  }

  button::after {
    transform: translate3d(0, 10px, 0);
  }
  .open span {
    opacity: 0;
  }

  .open::before {
    transform: rotate3d(0, 0, 1, 45deg);
  }

  .open::after {
    transform: rotate3d(0, 0, 1, -45deg);
  }
</style>
