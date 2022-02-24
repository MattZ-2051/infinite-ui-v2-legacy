<script lang="ts">
  import Accordion from '$ui/accordion/Accordion.svelte';
  import { Checkbox } from '$ui/checkbox';

  export let id;
  export let title;
  export let active;
  export let selectedGroup;
  export let options;
  export let valueAtrName;
  export let labelAtrName;
  export let toggleId = id;
  import { setFilters } from '../marketplace.service';

  function toggleOption(
    type: 'category' | 'typeEdition' | 'series' | 'issuerId' | 'saleType' | 'currency',
    _id: string,
    event: Event,
    lastState: string[]
  ) {
    let parametersToRemove = undefined;
    for (let index = 0; index < lastState.length - 1; index++) {
      parametersToRemove = { ...parametersToRemove, [`${type}:${lastState[index]}`]: false };
    }
    lastState.splice(0, lastState.length - 1);
    if (parametersToRemove) {
      setFilters({
        params: {
          [`${type}:${_id}`]: (event.target as HTMLInputElement).checked,
          page: 1,
          ...parametersToRemove,
        },
      });
    } else {
      setFilters({
        params: { [`${type}:${_id}`]: (event.target as HTMLInputElement).checked, page: 1 },
      });
    }
    return lastState;
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
      exclusive={true}
      class="mb-2"
      value={option[valueAtrName]}
      group={selectedGroup}
      on:change={(event) => (selectedGroup = toggleOption(toggleId, option[valueAtrName], event, selectedGroup))}
      let:checked
    >
      <span>{option[labelAtrName]}</span>
    </Checkbox>
  {/each}
</Accordion>
