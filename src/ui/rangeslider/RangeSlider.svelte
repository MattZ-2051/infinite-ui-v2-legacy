<script lang="ts">
  import RangeSliderPips from 'svelte-range-slider-pips';
  import './range-slider.css';

  export let values: [number, number];
  export let float = true;
  export let prefix = '$';
</script>

<RangeSliderPips range bind:values {float} {prefix} {...$$restProps} on:change />
