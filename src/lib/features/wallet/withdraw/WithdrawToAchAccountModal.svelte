<script lang="ts">
  import type { AchAccount } from './types';
  import Button from '$lib/components/Button.svelte';
  import { Modal, closeModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { formatCurrency } from '$util/format';
  import { withdrawToAchAccount } from './ach.api';

  export let isOpen: boolean;
  export let achAccount: AchAccount;
  export let withdrawableAmount: number;
  export let onSelectAchAccount: () => void;
  export let onWithdrawComplete: () => void;
  export let onClose: () => void;

  let amount: number;

  function onPriceChange() {
    if (amount < 0) {
      amount = 0;
    }
  }

  async function onConfirm() {
    if (!amount) {
      toast.danger(`Please, provide a valid amount.`);

      return;
    }

    if (amount > withdrawableAmount) {
      toast.danger(`Cannot withdraw more than ${formatCurrency(withdrawableAmount)}.`);

      return;
    }

    await withdrawToAchAccount(achAccount.id, amount)
      .then(() => {
        toast.success('The withdrawal to the ACH account was successful.');

        onWithdrawComplete();

        return true;
      })
      .catch(() => toast.danger('There was an error with your withdrawal. Please, try again.'));
  }

  function _onClose() {
    closeModal();

    onClose();
  }
</script>

{#if isOpen}
  <Modal on:close={_onClose}>
    <div class="flex flex-col gap-4 px-10" slot="title">
      <img src={achAccount.plaidInfo.institution_logo} alt="Institution Logo" class="w-full max-w-md" />
      <div class="font-semibold text-center text-2xl">{achAccount.plaidInfo.metadata.institution.name}</div>
      <div class="text-gray-500 text-center text-xl">xxxx{achAccount.plaidInfo.metadata.account.mask}</div>
    </div>
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <div class="w-full text-gray-500 text-center">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. -->
      </div>
      <div class="input-container flex items-center relative py-4">
        <input
          type="number"
          min="0"
          max={withdrawableAmount}
          placeholder="Enter amount"
          class="relative w-full bg-gray-100 py-3 pl-8 pr-2 outline-none rounded-2xl text-center"
          bind:value={amount}
          on:change={onPriceChange}
        />
      </div>
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button type="button" on:click={onConfirm}>Confirm Withdraw</Button>
      <Button type="button" on:click={onSelectAchAccount} theme="secondary">Go Back</Button>
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
