<script>
</script>

<div {...$$restProps}>
  <slot />
</div>

<style>
  div :global(button),
  div :global(a) {
    color: var(--button-group-color);
    background-color: var(--button-group-bg-color);
  }
  div :global(button):hover,
  div :global(a):hover {
    color: var(--button-group-color-hover);
    background-color: var(--button-group-bg-color-hover);
  }
</style>
