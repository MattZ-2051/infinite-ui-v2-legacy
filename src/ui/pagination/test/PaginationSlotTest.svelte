<script>
  export let component;
</script>

<svelte:component this={component} {...$$restProps}>
  <span slot="first">First</span>
  <span slot="previous">Previous</span>
  <span slot="next">Next</span>
  <span slot="last">Last</span>
</svelte:component>
