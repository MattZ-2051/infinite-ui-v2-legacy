<script context="module" lang="ts">
  type AccordionCurrent = () => boolean | null;
  export type AccordionContext = { setCurrent: (fn: AccordionCurrent) => void };
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  const current = writable<AccordionCurrent>(null);

  setContext('Accordion', <AccordionContext>{
    setCurrent: (fn: AccordionCurrent) => {
      $current && $current !== fn && $current();
      current.set(fn);
    },
  });
</script>

<slot />
