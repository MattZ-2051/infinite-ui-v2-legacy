<script lang="ts">
  import type { AchAccount } from '../types';
  import Button from '$lib/components/Button.svelte';
  import { Modal, closeModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { formatCurrency } from '$util/format';
  import { achAccountWithdrawFx } from './account-withdraw.store';

  export let isOpen: boolean;
  export let achAccount: AchAccount;
  export let withdrawableAmount: number;

  let amount: number;

  function onPriceChange() {
    if (amount < 0) {
      amount = 0;
    }
  }

  const pending = achAccountWithdrawFx.pending;

  async function onConfirm() {
    if (!amount || amount < 0) {
      toast.danger(`Please, provide a valid amount.`);
      return;
    }

    if (amount > withdrawableAmount) {
      toast.danger(`Cannot withdraw more than ${formatCurrency(withdrawableAmount)}.`);
      return;
    }

    await achAccountWithdrawFx({ achAccount, amount });
    closeModal();
  }
</script>

{#if isOpen}
  <Modal on:close={closeModal}>
    <div class="flex flex-col items-center justify-center px-10 gap-2" slot="title">
      <img src={`data:image/png;base64,${achAccount.plaidInfo.institution_logo}`} alt="" class="w-20" />
      <div class="text-center text-2xl">
        <div class="font-semibold">{achAccount.plaidInfo.metadata.institution.name}</div>
        <div class="text-gray-500">xxxx{achAccount.plaidInfo.metadata.account.mask}</div>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <div class="w-full max-w-sm text-gray-500 text-center">
        <div class="mb-4">Enter the amount you would like to withdraw.</div>
        <div>
          Withdrawable balance: <span class="text-black font-semibold">{formatCurrency(withdrawableAmount)}</span>
        </div>
        <div>(Excludes pending transactions and credit card payments less than 30 days old)</div>
      </div>
      <div class="input-container flex items-center relative py-4">
        <input
          type="number"
          min="0"
          max={withdrawableAmount}
          placeholder="Enter amount"
          class="relative w-full bg-gray-50 py-3 pl-8 pr-2 outline-none rounded-lg text-center border-0 text-xl"
          data-initial-focus
          bind:value={amount}
          on:change={onPriceChange}
        />
      </div>
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button variant="brand" on:click={onConfirm} disabled={$pending}>Confirm Withdraw</Button>
      <Button variant="outline-brand" on:click={closeModal}>Go Back</Button>
    </div>
  </Modal>
{/if}

<style>
  .input-container::before {
    content: '$';
    position: absolute;
    left: 10px;
    z-index: 1;
    @apply text-xl;
    @apply text-gray-400;
  }
</style>
