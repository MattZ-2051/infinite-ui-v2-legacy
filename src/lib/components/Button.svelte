<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';

  export let type = 'button';
  export let disabled = false;
  export let theme: 'primary' | 'secondary' = 'primary';

  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());

  const themes = {
    primary: {
      default: 'bg-black text-white transform duration-200 outline-none',
      hover: 'hover:scale-105',
    },
    secondary: {
      default: 'bg-white text-black border-2 border-black transform duration-200',
      hover: 'hover:bg-black hover:text-white hover:scale-105',
    },
  };

  $: _theme = themes[theme];
</script>

<button
  {type}
  use:forwardEvents
  {disabled}
  class="{_theme.default} {!disabled && _theme.hover} text-xl text-center rounded-full p-4 w-full {_class || ''}"
  {...$$restProps}><slot /></button
>

<style lang="postcss">
  button:disabled,
  button[disabled] {
    @apply opacity-50 cursor-default;
  }
</style>
