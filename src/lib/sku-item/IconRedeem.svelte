<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import iconRedeem from '$lib/components/icons/redeem';
  import iconRedeemed from '$lib/components/icons/redeemed';

  export let hasTooltip = true;
  export let disabled = false;

  $: iconPath = disabled ? iconRedeemed : iconRedeem;
  $: tooltip = hasTooltip ? 'Redeemable' : '';
</script>

<span class="redeem-trigger relative"><Icon path={iconPath} size="0.75" {tooltip} {...$$restProps} /></span>

<style lang="postcss">
  .redeem-trigger {
    color: var(--icon-redeem-color);
    padding: var(--icon-redeem-padding);
    border-radius: var(--icon-redeem-border-radius);
    background: var(--icon-redeem-bg);
  }
</style>
