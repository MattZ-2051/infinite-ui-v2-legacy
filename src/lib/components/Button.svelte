<script lang="ts">
  export let type = 'button';

  let _class = null;
  export { _class as class };
</script>

<button
  {type}
  class="bg-black hover:bg-gray-900 text-white text-xl text-center rounded-full p-4 w-full {_class ||
    ''}"
  {...$$restProps}><slot /></button
>

<style>
</style>
