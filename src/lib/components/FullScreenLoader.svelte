<script lang="ts">
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';

  let _class = '';
  export { _class as class };
</script>

<div
  class="flex flex-col flex-grow items-center justify-center {_class}"
  {...$$restProps}
  data-testid="fullscreen-loader"
>
  <DualRingLoader class="mb-1" data-testid="dual-ring-loader" />
  <slot>Loading...</slot>
</div>
