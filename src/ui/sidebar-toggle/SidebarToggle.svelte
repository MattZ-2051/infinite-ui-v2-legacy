<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import closeIcon from '$project/assets/lib/close-icon';

  export let isOpen: boolean;

  const dispatch = createEventDispatcher();

  const sidebarIconColor = 'var(--mobile-sidebar-toggle-color, currentColor)';
</script>

<button type="button" class:open={isOpen} on:click={() => dispatch('toggle', !isOpen)} {...$$restProps}>
  {#if !isOpen}
    <svg>
      <line y1="1" x2="32" y2="1" stroke-width="2" stroke={sidebarIconColor} />
    </svg>
    <svg>
      <line y1="1" x2="32" y2="1" stroke-width="2" stroke={sidebarIconColor} />
    </svg>
    <svg>
      <line y1="1" x2="32" y2="1" stroke-width="2" stroke={sidebarIconColor} />
    </svg>
  {:else}
    <svg>
      {#if typeof closeIcon.d === 'string'}
        <path d={closeIcon.d} fill={sidebarIconColor} transform="scale(0.62,0.62)" />
      {:else}
        {#each closeIcon.d as d}
          <path {d} stroke-width="2" stroke-linecap="square" stroke-linejoin="round" stroke={sidebarIconColor} />
        {/each}
      {/if}
    </svg>
  {/if}
  <span>Menu</span>
</button>

<style lang="postcss">
  button {
    border: none;
    padding: 0;
    outline: none;
    position: relative;
    @apply z-menu;
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

  .open span {
    opacity: 0;
  }

  button svg {
    width: var(--mobile-sidebar-toggle-icons-width, 30px);
  }

  button:not(.open) svg {
    height: 2px;
  }

  button:not(.open) svg:not(:first-child) {
    margin-top: var(--mobile-sidebar-burger-svg-line-margin-top, 8px);
  }

  button.open svg {
    height: var(--mobile-sidebar-close-icon-height, 24px);
    margin-top: var(--mobile-sidebar-close-icon-margin-top, 0);
  }
</style>
