<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import Input from '$lib/components/Input.svelte';
  import { getPathValue } from './form.util';

  export let name: string;
  export let label = '';
  export let before = '';
  export let after = '';
  export let value = '';
  export let placeholder = '';
  export let disabled = false;

  const errors = getContext('errors') as Writable<unknown>;
</script>

<Input let:klass let:id {label} {before} {after} error={getPathValue(name, $errors)}>
  <input {id} class={klass} {name} {value} {placeholder} {disabled} {...$$restProps} />
</Input>
