<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import Input from '$lib/components/Input.svelte';
  import { getPathValue } from './form.util';

  export let name: string;
  export let label = '';
  export let value = '';
  export let placeholder = '';

  const errors = getContext('errors') as Writable<unknown>;
</script>

<Input let:klass let:id {label} error={getPathValue(name, $errors)} {...$$restProps}>
  <input {id} class={klass} {name} {value} {placeholder} />
</Input>

<style>
  input {
    color: var(--form-input-color, theme('colors.gray.700'));
    text-align: var(--form-input-align, left);
  }
  input::placeholder {
    font-weight: var(--form-placeholder-weight);
  }
</style>
