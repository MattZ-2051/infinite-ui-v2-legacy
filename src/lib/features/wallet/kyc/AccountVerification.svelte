<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiShieldSync, mdiShieldHalfFull, mdiArrowRight, mdiShield, mdiShieldAlert } from '@mdi/js';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import Button from '$lib/components/Button.svelte';

  export let kycPending: boolean;
  export let kycMaxLevel: number;
  export let dailyDepositLimit: number;

  const dispatch = createEventDispatcher();

  $: kycAllowedAmountL2 = `You are eligible to deposit cryptocurrency and a cumulative balance > ${formatCurrencyWithOptionalFractionDigits(
    dailyDepositLimit
  )}`;
  $: kycAllowedAmountL1 = `You are eligible to deposit cryptocurrency and a cumulative balance up to ${formatCurrencyWithOptionalFractionDigits(
    dailyDepositLimit
  )}`;
  $: kyc1NeededInfoText = `Account verification is required for users to deposit cryptocurrency or > ${formatCurrencyWithOptionalFractionDigits(
    dailyDepositLimit
  )} from a credit card.`;
</script>

<div class="font-semibold">Account Verification Status:</div>
<div class="flex flex-row font-semibold" {...$$restProps}>
  {#if kycPending}
    {#if kycMaxLevel === 0}
      <div class="flex flex-col gap-2">
        <div class="flex gap-2 text-gray-400"><Icon path={mdiShieldSync} />Pending...</div>
        <div class="text-gray-400 text-xs font-normal">Your account verification is in progress</div>
      </div>
    {:else if kycMaxLevel === 1}
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <Icon path={mdiShieldHalfFull} />
          <span>lvl {kycMaxLevel}</span>
          <Icon path={mdiArrowRight} />
          <div class="flex gap-1 text-gray-400">
            <Icon path={mdiShieldSync} />
            <span>lvl {kycMaxLevel + 1}</span>
            <span>Pending...</span>
          </div>
        </div>
        <div class="text-gray-400 text-xs font-normal">{kycAllowedAmountL1}</div>
      </div>
    {/if}
  {:else if kycMaxLevel >= 1}
    {#if kycMaxLevel === 1}
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <Icon path={mdiShieldHalfFull} />
          <span>lvl {kycMaxLevel}</span>
          <div class="w-28 button-container ml-2">
            <Button on:click={() => dispatch('upgrade')}>Upgrade</Button>
          </div>
        </div>
        <div class="text-gray-400 text-xs font-normal">{kycAllowedAmountL1}</div>
      </div>
    {:else}
      <div class="flex flex-col gap-2">
        <div class="flex gap-2 items-center">
          <Icon path={mdiShield} />
          <span>lvl {kycMaxLevel}</span>
        </div>
        <div class="text-gray-400 text-xs font-normal">{kycAllowedAmountL2}</div>
      </div>
    {/if}
  {:else}
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 items-center text-gray-400">
        <Icon path={mdiShieldAlert} />
        <span>Unverified</span>
        <div class="w-28 button-container ml-2">
          <Button on:click={() => dispatch('verify')}>Verify</Button>
        </div>
      </div>
      <div class="text-gray-400 text-xs font-normal">{kyc1NeededInfoText}</div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .button-container {
    --button-padding: 0.5rem;
    --button-text-size: 1rem;
    --button-line-height: 1.5rem;
  }
</style>
