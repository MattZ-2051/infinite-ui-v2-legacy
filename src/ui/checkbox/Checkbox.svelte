<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';

  export let group: string[] | undefined = undefined;
  export let value = 'on';
  export let checked = false;
  export let exclusive = false;

  let _class = '';
  export { _class as class };

  $: Array.isArray(group) && updateChekbox(group);
  $: Array.isArray(group) && updateGroup(checked);

  function updateChekbox(_group) {
    checked = _group.includes(value);
  }

  function updateGroup(_checked) {
    const index = group.indexOf(value);
    if (_checked) {
      if (index < 0) {
        group.push(value);
        group = group;
      }
    } else {
      if (index >= 0) {
        group.splice(index, 1);
        group = group;
      }
    }
  }

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

{#if exclusive}
  <label class="flex gap-2 items-center cursor-pointer select-none {_class || ''}" {...$$restProps}>
    <input class="sr-only" type="checkbox" bind:checked {value} use:forwardEvents />
    <span class="flex-none relative point" />
    <div class="flex-grow"><slot {checked} /></div>
  </label>
{:else}
  <label class="flex gap-2 items-center cursor-pointer select-none {_class || ''}" {...$$restProps}>
    <input class="sr-only" type="checkbox" bind:checked {value} use:forwardEvents />
    <span class="flex-none relative checkmark" style="border-radius: var(--checkbox-border-radius, 0px);" />
    <div class="flex-grow"><slot {checked} /></div>
  </label>
{/if}

<style lang="postcss">
  .checkmark {
    height: 16px;
    width: 16px;
    border: 1px solid theme('colors.gray.200');
  }
  .point {
    height: 24px;
    width: 24px;
    border: 1px solid theme('colors.gray.200');
    border-radius: 24px;
  }
  input:checked + .checkmark {
    z-index: 1;
    background: var(--checkbox-span-bg-color, var(--bg-color));
    border-radius: var(--checkbox-border-radius, 0px);
    border: var(--checkbox-span-border, 1px solid theme('colors.gray.200'));
  }

  .checkmark::before {
    position: absolute;
    z-index: 0;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background: var(--bg-color);
    content: '';
    border-radius: var(--checkbox-border-radius, 0px);
  }

  input:checked ~ .checkmark:after {
    display: block;
  }
  .checkmark:after {
    left: 3.5px;
    top: -1px;
    width: 7px;
    height: 12px;
    border: 1px solid var(--default-color);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ .point:before {
    position: absolute;
    z-index: 0;
    top: var(--radio-button-selected-border-width);
    left: var(--radio-button-selected-border-width);
    right: var(--radio-button-selected-border-width);
    bottom: var(--radio-button-selected-border-width);
    background-color: var(--inverse-color);
    content: '';
    border-radius: 44px;
  }
  input:checked + .point {
    background: var(--radio-button-border-color, black);
    border-color: transparent;
  }
</style>
