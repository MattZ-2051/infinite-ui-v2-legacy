<script lang="ts">
  import { countries } from './countries';
  import FormElement from './FormElement.svelte';
  import Select from './select/Select.svelte';

  export let name: string;
  export let label: string;
  export let countryISO2: string;

  $: states = countries.find((country) => country.iso2 === countryISO2)?.states || [];
  $: stateOptions = states.length > 0 ? [{ name: '', stateCode: '' }, ...states] : [];
</script>

<FormElement component={Select} {label} {name} {...$$restProps}>
  {#each stateOptions as state}
    <option value={state.stateCode}>{state.name}</option>
  {/each}
</FormElement>
