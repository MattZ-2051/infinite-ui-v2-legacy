<script lang="ts">
  import type { TooltipInput } from '$ui/tooltip';
  import Icon from '$ui/icon/Icon.svelte';
  import iconRedeem from '$lib/components/icons/redeem';
  import iconRedeemed from '$lib/components/icons/redeemed';

  export let tooltip: TooltipInput = 'Redeemable';
  export let disabled = false;

  $: iconPath = disabled ? iconRedeemed : iconRedeem;
</script>

<span class="relative"><Icon path={iconPath} {tooltip} {...$$restProps} /></span>
