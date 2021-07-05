<script lang="ts">
  import type { TooltipInput } from '$ui/tooltip';
  import Icon from '$ui/icon/Icon.svelte';
  import iconRedeem from '$lib/components/icons/redeem';

  export let tooltip: TooltipInput = 'Redeemable';
  export let disabled = false;
</script>

<span class="relative" class:redeemed={disabled}><Icon path={iconRedeem} {tooltip} {...$$restProps} /></span>

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
