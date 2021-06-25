<script lang="ts">
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';

  let _class = '';
  export { _class as class };
</script>

<div class="flex flex-col flex-grow items-center justify-center {_class}" {...$$restProps}>
  <DualRingLoader class="mb-1" />
  <slot>Loading...</slot>
</div>
