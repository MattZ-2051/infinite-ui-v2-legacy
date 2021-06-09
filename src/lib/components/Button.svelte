<script lang="ts">
  import { beforeUpdate } from 'svelte';

  export let type = 'button';

  let restProps: { [index: string]: any };

  beforeUpdate(() => {
    let { class: _, ...rest } = $$restProps;
    restProps = rest;
  });
</script>

<button
  {type}
  class="bg-black hover:bg-gray-900 text-white text-xl text-center rounded-full p-4 w-full {$$props.class ||
    ''}"
  {...restProps}><slot /></button
>

<style>
</style>
