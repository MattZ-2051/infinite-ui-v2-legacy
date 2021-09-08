<script lang="ts">
  import { mdiMagnify } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import Input from '$lib/components/Input.svelte';

  export let value = '';
  export let placeholder = 'Search';

  let _class = '';
  export { _class as class };
</script>

<Input let:klass let:id>
  <input
    type="text"
    {id}
    autocomplete="off"
    class="{klass} {_class}"
    on:input
    on:focus
    on:blur
    {value}
    {placeholder}
    {...$$restProps}
  />
  <Icon slot="before" class="text-white-opacity-50" path={mdiMagnify} size="1.2" />
</Input>
