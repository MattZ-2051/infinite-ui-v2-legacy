<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';

  export let type = 'button';
  export let disabled = false;

  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<button
  {type}
  use:forwardEvents
  {disabled}
  class="bg-black {disabled
    ? 'opacity-50'
    : 'hover:bg-gray-900'} text-white text-xl text-center rounded-full p-4 w-full disabled:opacity-50 {_class ||
    ''}"
  {...$$restProps}><slot /></button
>

<style>
</style>
