<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import debounceFunction from 'just-debounce';

  export let format = (value) => value;
  export let min = 0;
  export let max = 100;
  export let values: [string, string];
  export let step = 1;
  export let debounce = 100;

  $: _valueLeft = Math.max(min, Math.min(+values[0], +values[1]));
  $: _valueRight = Math.min(max, Math.max(+values[0], +values[1]));

  const dispatch = createEventDispatcher();

  const onStop = debounceFunction(() => dispatch('stop', values), debounce);

  function getPercentage(value: number) {
    return ((value - min) / (max - min)) * 100;
  }

  let activeThumb: 'L' | 'R' = undefined;

  function activateThumb(thumb: 'L' | 'R' | undefined) {
    activeThumb = thumb;
  }
</script>

<div class="slider">
  <div>
    <div class="inverse-left" style="width:{getPercentage(_valueLeft)}%;" />
    <div class="inverse-right" style="width:{100 - getPercentage(_valueRight)}%;" />
    <div class="range" style="left:{getPercentage(_valueLeft)}%;right:{100 - getPercentage(_valueRight)}%;" />
    <span class="thumb" class:active={activeThumb === 'L'} style="left:{getPercentage(_valueLeft)}%;" />
    <span class="thumb" class:active={activeThumb === 'R'} style="left:{getPercentage(_valueRight)}%;" />
    <div class="sign" class:activeSign={activeThumb === 'L'} style="left:{getPercentage(_valueLeft)}%;">
      <span id="value">{format(_valueLeft)}</span>
    </div>
    <div class="sign" class:activeSign={activeThumb === 'R'} style="left:{getPercentage(_valueRight)}%;">
      <span id="value">{format(_valueRight)}</span>
    </div>
  </div>
  <input
    class="cursor-pointer"
    type="range"
    tabindex="0"
    bind:value={values[0]}
    {max}
    {min}
    {step}
    on:change={onStop}
    on:input={() => (values[1] = `${Math.max(+values[0], +values[1])}`)}
    on:mouseover={() => activateThumb('L')}
    on:focus={() => activateThumb('L')}
    on:mouseout={() => activateThumb(undefined)}
    on:blur={() => activateThumb(undefined)}
  />
  <input
    class="cursor-pointer"
    type="range"
    tabindex="0"
    bind:value={values[1]}
    {max}
    {min}
    {step}
    on:change={onStop}
    on:input={() => (values[0] = `${Math.min(+values[0], +values[1])}`)}
    on:mouseover={() => activateThumb('R')}
    on:focus={() => activateThumb('R')}
    on:mouseout={() => activateThumb(undefined)}
    on:blur={() => activateThumb(undefined)}
  />
</div>

<style>
  .slider {
    position: relative;
    height: 1px;
    border-radius: 10px;
    text-align: left;
    margin: 10px 0;
    width: 100%;
  }
  .slider > div {
    position: absolute;
    left: 14px;
    right: 14px;
    height: 1px;
  }
  .inverse-left {
    position: absolute;
    left: 0;
    height: 1px;
    border-radius: 10px;
    background-color: var(--range-slider-bg-color);
    margin: 0 7px;
  }
  .inverse-right {
    position: absolute;
    right: 0;
    height: 1px;
    border-radius: 10px;
    background-color: var(--range-slider-bg-color);
    margin: 0 7px;
  }
  .range {
    position: absolute;
    left: 0;
    height: 1px;
    border-radius: 14px;
    background-color: var(--range-slider-bg-color-selected);
  }
  .thumb {
    position: absolute;
    top: -7px;
    z-index: 2;
    height: 15px;
    width: 15px;
    text-align: left;
    margin-left: -11px;
    border: 2px solid var(--range-slider-bg-color-selected);
    background-color: var(--range-slider-thumb-bg-color);
    border-radius: 50%;
    outline: none;
  }

  .active {
    background-color: var(--range-slider-thumb-active-color);
  }

  input[type='range'] {
    position: absolute;
    pointer-events: none;
    appearance: none;
    z-index: 3;
    height: 14px;
    top: -2px;
    left: 0;
    right: 0;
    width: 100%;
    opacity: 0;
  }
  input[type='range']::-ms-track {
    -webkit-appearance: none;
    background: 0 0;
    color: transparent;
  }
  input[type='range']::-moz-range-track {
    -moz-appearance: none;
    background: 0 0;
    color: transparent;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: 0 0;
    border: transparent;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-ms-thumb {
    pointer-events: all;
    width: 28px;
    height: 28px;
    border-radius: 0;
    border: 0;
    background: red;
  }
  input[type='range']::-moz-range-thumb {
    pointer-events: all;
    width: 28px;
    height: 28px;
    border-radius: 0;
    border: 0;
    background: red;
  }
  input[type='range']::-webkit-slider-thumb {
    pointer-events: all;
    width: 28px;
    height: 28px;
    border-radius: 0;
    border: 0;
    background: red;
    -webkit-appearance: none;
  }
  input[type='range']::-ms-fill-lower {
    background: 0 0;
    border: 0;
  }
  input[type='range']::-ms-fill-upper {
    background: 0 0;
    border: 0;
  }
  input[type='range']::-ms-tooltip {
    display: none;
  }

  .sign {
    opacity: 0;
    position: absolute;
    top: -28px;
    z-index: 3;
    color: var(--default-color);
    /* height: 28px; */
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: top 0.2s ease;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: 700;
    line-height: 28px;
  }

  .activeSign {
    opacity: 1;
    top: -38px;
  }
</style>
