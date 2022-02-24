<script lang="ts">
  import Accordion from '$ui/accordion/Accordion.svelte';
  import { Checkbox } from '$ui/checkbox';

  export let id;
  export let title;
  export let active;
  export let selectedGroup;
  export let options;
  export let toggleCheckboxFilter;
  export let valueAtrName;
  export let labelAtrName;
  export let toggleId = id;

  function toggle(
    type: 'category' | 'typeEdition' | 'series' | 'issuerId' | 'saleType' | 'currency',
    _id: string,
    event: Event
  ) {
    toggleCheckboxFilter(type, _id, (event.target as HTMLInputElement).checked);
  }
</script>

<Accordion
  {id}
  titleClass="py-4 px-6"
  class="c-filter-accordion accordion-option border border-gray-200 -mb-px {active.includes(id) ? 'expanded' : ''}"
>
  <div slot="title" class="text-lg leading-8 text-left">
    {title}
    {#if selectedGroup.length}
      <span class="text-default text-xs align-top">({selectedGroup.length})</span>
    {/if}
  </div>
  {#each options as option}
    <Checkbox
      class="mb-2"
      value={option[valueAtrName]}
      group={selectedGroup}
      on:change={(event) => toggle(toggleId, option[valueAtrName], event)}
      let:checked
    >
      <span>{option[labelAtrName]}</span>
    </Checkbox>
  {/each}
</Accordion>
