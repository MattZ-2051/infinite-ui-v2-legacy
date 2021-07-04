<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import Input from '$lib/components/Input.svelte';
  import { countries } from './countries';

  export let name: string;
  export let label: string;

  const errors = getContext('errors') as Writable<unknown>;

  function getPathValue(myPath, object) {
    return object && myPath
      ? myPath.split('.').reduce((result, property) => (result ? result[property] : ''), object)
      : '';
  }
</script>

<Input let:klass let:id {label} error={getPathValue(name, $errors)} {...$$restProps}>
  <select {id} class={klass} {name}>
    {#each countries as country}
      <option value={country.iso2}>{country.name}</option>
    {/each}
  </select>
</Input>
