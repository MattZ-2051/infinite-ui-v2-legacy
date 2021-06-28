<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';

  export let group: string[] = [];
  export let value: string;

  let checked: boolean;

  $: updateChekbox(group);
  $: updateGroup(checked);

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

<label class="flex gap-2 items-center cursor-pointer select-none">
  <input class="sr-only" type="checkbox" bind:checked {value} {...$$restProps} use:forwardEvents />
  <span class="flex-none checkmark" />
  <div class="flex-grow"><slot /></div>
</label>

<style>
  .checkmark {
    position: relative;
    height: 16px;
    width: 16px;
    background-color: #d6d6d6;
    border-radius: 50%;
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
  .checkmark:after {
    left: 5px;
    top: -3px;
    width: 9px;
    height: 15px;
    border-radius: 0.125rem;
    border: solid black;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    content: '';
    position: absolute;
    display: none;
  }
  label:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input[type='checkbox']:checked ~ div {
    color: #000000;
  }
</style>
