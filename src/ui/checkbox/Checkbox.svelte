<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';

  export let group: string[] | undefined = undefined;
  export let value = 'on';
  export let checked = false;

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

<label class="flex gap-2 items-center cursor-pointer select-none {_class || ''}" {...$$restProps}>
  <input class="sr-only" type="checkbox" bind:checked {value} use:forwardEvents />
  <span class="flex-none relative checkmark border" />
  <div class="flex-grow"><slot {checked} /></div>
</label>

<style lang="postcss">
  .checkmark {
    height: 16px;
    width: 16px;
    border-color: theme('colors.gray.200');
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
</style>
