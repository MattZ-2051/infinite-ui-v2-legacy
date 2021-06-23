<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';

  export let type = 'button';

  let _class = undefined;
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<button
  {type}
  use:forwardEvents
  class="bg-black hover:bg-gray-900 text-white text-xl text-center rounded-full p-4 w-full {_class ||
    ''}"
  {...$$restProps}><slot /></button
>

<style>
</style>
