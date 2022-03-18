<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';

  export let checked = false;

  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<label class="flex gap-2 items-center cursor-pointer select-none {_class || ''}" {...$$restProps}>
  <input class="sr-only" type="checkbox" bind:checked use:forwardEvents />
  <span class="flex-none relative checkmark" style="border-radius: var(--checkbox-border-radius, 0px);" />
  <div class="flex-grow"><slot {checked} /></div>
</label>

<style lang="postcss">
  .checkmark {
    height: 16px;
    width: 16px;
    border: 1px solid theme('colors.gray.200');
  }

  label:hover .checkmark {
    transition: 0.5s;
    border: 1px solid var(--market-checkmark-hover-color, theme('colors.gray.200'));
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
</style>
