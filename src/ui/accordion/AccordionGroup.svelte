<script context="module" lang="ts">
  type AccordionCurrent = () => boolean | undefined;
  export type AccordionContext = { setCurrent: (current: AccordionCurrent) => void };
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  const current = writable<AccordionCurrent>(undefined);

  setContext('Accordion', <AccordionContext>{
    setCurrent: (function_: AccordionCurrent) => {
      $current && $current !== function_ && $current();
      current.set(function_);
    },
  });
</script>

<slot />
