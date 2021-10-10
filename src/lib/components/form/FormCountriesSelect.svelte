<script lang="ts">
  import { countries } from './countries';
  import FormElement from './FormElement.svelte';
  import Select from './select/Select.svelte';

  export let name: string;
  export let label: string;
</script>

<FormElement component={Select} {label} {name} {...$$restProps}>
  <option disabled hidden value="" />
  {#each countries as country}
    <option value={country.iso2}>{country.name}</option>
  {/each}
</FormElement>
