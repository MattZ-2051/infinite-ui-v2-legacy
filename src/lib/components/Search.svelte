<script lang="ts">
  import debounce from 'just-debounce';
  import { mdiMagnify } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  export let onInput: (value: string) => void | Promise<void>;
  export let value = '';
  export let placeholder = 'Search';
  export let debouncePeriod = 0;

  let _class = '';
  export { _class as class };

  const _onInput =
    debouncePeriod <= 0
      ? async (event) => await onInput(event.target.value)
      : debounce(async (event) => await onInput(event.target.value), debouncePeriod);
</script>

<div class="{_class || ''} flex items-center relative w-full">
  <input
    type="text"
    on:input={_onInput}
    on:focus
    on:blur
    {value}
    {placeholder}
    class="px-10 bg-gray-100 py-2 rounded-2xl outline-none w-full"
    {...$$restProps}
  />
  <Icon path={mdiMagnify} size="1.2" color="gray" class="absolute left-2" />
</div>

<style>
  input::placeholder {
    @apply text-gray-400;
    @apply font-black;
    @apply italic;
  }
</style>
