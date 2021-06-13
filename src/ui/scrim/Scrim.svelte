<script>
  import { fade } from 'svelte/transition';
  import { quadOut, quadIn } from 'svelte/easing';

  export let opacity = 0.68;
  export let inTransition = { duration: 200, easing: quadIn };
  export let outTransition = { duration: 200, easing: quadOut };
</script>

<div
  class="bg-black fixed top-0 left-0 z-10 w-full h-full"
  {...$$restProps}
  style="opacity: {opacity}"
  in:fade={inTransition}
  out:fade={outTransition}
  on:click
/>
