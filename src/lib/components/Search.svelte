<script lang="ts">
  import mdiMagnify from '$lib/components/icons/magnifying-glass';
  import Icon from '$ui/icon/Icon.svelte';
  import { Input } from '$lib/components/form';

  export let value = '';
  export let placeholder = 'Search';
</script>

<Input type="text" autocomplete="off" on:input on:focus on:blur {value} {placeholder} {...$$restProps}>
  <Icon slot="before" path={mdiMagnify} size="1" />
</Input>
