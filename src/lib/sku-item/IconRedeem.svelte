<script lang="ts">
  import type { TooltipInput } from '$ui/tooltip';
  import Icon from '$ui/icon/Icon.svelte';

  export let tooltip: TooltipInput = 'Redeemable';
  export let disabled = false;

  const path =
    'M 23.25,12.00C 23.25,11.20 22.61,10.39 21.80,10.23 17.62,9.59 14.41,6.38 13.77,2.20 13.61,1.39 12.80,0.75 12.00,0.75 11.20,0.75 10.39,1.39 10.23,2.20 9.59,6.38 6.38,9.59 2.20,10.23 1.39,10.39 0.75,11.20 0.75,12.00 0.75,12.80 1.39,13.61 2.20,13.77 6.38,14.41 9.59,17.62 10.23,21.80 10.39,22.61 11.20,23.25 12.00,23.25 12.80,23.25 13.61,22.61 13.77,21.80 14.41,17.62 17.62,14.41 21.80,13.77 22.61,13.61 23.25,12.80 23.25,12.00 Z';
</script>

<span class="relative" class:redeemed={disabled}><Icon {path} {tooltip} {...$$restProps} /></span>

<style>
  .redeemed::after {
    pointer-events: none;
    content: '';
    position: absolute;
    border-bottom: 2px solid white;
    width: 22px;
    top: 13px;
    left: 3px;
    transform: rotate(45deg);
  }
  .redeemed::before {
    pointer-events: none;
    content: '';
    position: absolute;
    border-bottom: 8px solid;
    width: 24px;
    top: 12px;
    left: 4px;
    transform: rotate(45deg);
    @apply border-gray-900;
  }
</style>
