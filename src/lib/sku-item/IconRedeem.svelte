<script lang="ts">
  import tooltipAction from '$ui/tooltip';
  import Icon from '$ui/icon/Icon.svelte';
  import iconRedeem from '$lib/components/icons/redeem';
  import iconRedeemed from '$lib/components/icons/redeemed';
  import { CLIENT_REDEEM_URL } from '$project/variables';

  export let disabled = false;
  export let size = 24;

  $: iconPath = disabled ? iconRedeemed : iconRedeem;
  $: padding = Math.floor(size / 5.333_333);

  const tooltipMessage = {
    content: `Learn more about redeemable collectibles <a class="underline" target="_blank" rel="noreferrer" href=${CLIENT_REDEEM_URL}>here</a>`,
    allowHTML: true,
    interactive: true,
    maxWidth: 270,
  };
</script>

<div class="inline-flex items-center gap-2" use:tooltipAction={tooltipMessage}>
  <span
    class="redeem-trigger relative inline-flex"
    on:click|preventDefault|stopPropagation
    style="padding: {padding}px"
  >
    <Icon path={iconPath} size={`${size - 2 * padding}px`} {...$$restProps} />
  </span>
  <slot />
</div>

<style lang="postcss">
  .redeem-trigger {
    color: var(--icon-redeem-color, var(--default-color));
    border-radius: var(--icon-redeem-border-radius, 50%);
    background: var(--icon-redeem-bg-color, transparent);
  }
</style>
