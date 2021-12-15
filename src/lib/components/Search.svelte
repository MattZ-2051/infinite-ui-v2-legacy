<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import magnify from '$lib/components/icons/magnify';
  import { Input } from '$lib/components/form';

  export let value = '';
  export let placeholder = 'Search';
</script>

<Input type="text" autocomplete="off" on:input on:focus on:blur {value} {placeholder} {...$$restProps}>
  <Icon slot="before" path={magnify} size="1" />
</Input>
