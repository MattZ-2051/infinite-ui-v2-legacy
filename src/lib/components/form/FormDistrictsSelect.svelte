<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';
  import Input from '$lib/components/Input.svelte';
  import { countries } from './countries';
  import { getPathValue } from './form.util';

  export let name: string;
  export let label: string;
  export let countryISO2: string;

  const errors = getContext('errors') as Writable<unknown>;

  $: states = countries.find((country) => country.iso2 === countryISO2)?.states || [];
  $: stateOptions = states.length > 0 ? [{ name: '', stateCode: '' }, ...states] : [];
</script>

<Input let:klass let:id {label} error={getPathValue(name, $errors)} {...$$restProps}>
  <select {id} class={klass} {name}>
    {#each stateOptions as state}
      <option value={state.stateCode}>{state.name}</option>
    {/each}
  </select>
</Input>
