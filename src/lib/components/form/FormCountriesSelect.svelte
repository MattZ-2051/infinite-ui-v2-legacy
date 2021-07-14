<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import Input from '$lib/components/Input.svelte';
  import { countries } from './countries';
  import { getPathValue } from './form.util';

  export let name: string;
  export let label: string;
  export let value: string = undefined;

  const errors = getContext('errors') as Writable<unknown>;
</script>

<Input let:klass let:id {label} error={getPathValue(name, $errors)} {...$$restProps}>
  <select bind:value {id} class={klass} {name}>
    {#each countries as country}
      <option value={country.iso2}>{country.name}</option>
    {/each}
  </select>
</Input>
