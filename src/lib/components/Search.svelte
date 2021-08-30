<script lang="ts">
  import debounce from 'just-debounce';
  import { mdiMagnify } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import Input from '$lib/components/Input.svelte';

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

<Input let:klass let:id>
  <input
    type="text"
    {id}
    autocomplete="off"
    class="{klass} {_class}"
    on:input={_onInput}
    on:focus
    on:blur
    {value}
    {placeholder}
    {...$$restProps}
  />
  <Icon slot="before" class="text-white-opacity-50" path={mdiMagnify} size="1.2" />
</Input>
