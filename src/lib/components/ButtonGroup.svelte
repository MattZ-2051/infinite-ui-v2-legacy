<script></script>

<div {...$$restProps}>
  <slot />
</div>

<style lang="postcss">
  div :global(button),
  div :global(a) {
    @apply transition duration-200;
    color: var(--button-group-color, var(--default-color));
    background-color: var(--button-group-bg-color, var(--bg-color));
  }
  div :global(button):hover,
  div :global(a):hover {
    color: var(--button-group-color-hover);
    background: var(--button-group-bg-color-hover);
  }
</style>
