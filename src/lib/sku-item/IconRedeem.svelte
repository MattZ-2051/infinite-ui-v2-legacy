<script lang="ts">
  import tooltip from '$ui/tooltip';
  import Icon from '$ui/icon/Icon.svelte';
  import iconRedeem from '$lib/components/icons/redeem';
  import iconRedeemed from '$lib/components/icons/redeemed';

  export let hasTooltip = true;
  export let disabled = false;
  export let size = 24;

  $: iconPath = disabled ? iconRedeemed : iconRedeem;
  $: tooltipMessage = hasTooltip ? 'Redeemable' : '';
  $: padding = size / 5.333_333;
</script>

<span class="redeem-trigger relative inline-flex" use:tooltip={tooltipMessage} style="padding: {padding}px"
  ><Icon path={iconPath} size={`${size - 2 * padding}px`} {...$$restProps} /></span
>

<style lang="postcss">
  .redeem-trigger {
    color: var(--icon-redeem-color);
    border-radius: var(--icon-redeem-border-radius);
    background: var(--icon-redeem-bg-color);
  }
</style>
