<script lang="ts">
  import type { AchAccount } from '../types';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import { Modal, closeModal, closeAllModals, closeModals } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { formatCurrency } from '$util/format';
  import routes from '$project/routes';
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

  let status: 'select-amount' | 'withdrawal-success' | 'withdrawal-error' = 'select-amount';
  const pending = achAccountWithdrawFx.pending;
  const titleMap = {
    'select-amount': 'Withdraw funds to',
    'withdrawal-success': 'Withdrawal initiated!',
    'withdrawal-error': 'Something went wrong.',
  };

  async function onConfirm() {
    const toastId = 'INVALID_WITHDRAW';

    if (!amount || amount <= 0) {
      toast.danger(`Please enter an amount > ${formatCurrency(0)}`, { toastId });
      return;
    }

    if (amount > withdrawableAmount) {
      toast.danger(`Cannot withdraw more than ${formatCurrency(withdrawableAmount)}.`, { toastId });
      return;
    }

    try {
      await achAccountWithdrawFx({ achAccount, amount });
      status = 'withdrawal-success';
    } catch {
      status = 'withdrawal-error';
    }
  }
</script>

{#if isOpen}
  <Modal title={!$pending && titleMap[status]} persistent={$pending} class="max-w-lg">
    {#if $pending}
      <div class="flex flex-col items-center justify-self-center mt-20 mb-10 gap-4">
        <DualRingLoader />
        <div class="text-gray-500 flex flex-col text-center">
          <p>We are processing your request.</p>
          <p>Please, do not close this window.</p>
        </div>
      </div>
    {:else if status === 'withdrawal-error'}
      <p class="text-gray-500 px-10 my-4 max-w-md">
        There was an issue processing your request. Please try again or visit the <a
          class="text-black underline font-bold"
          sveltekit:prefetch
          href={routes.help}
          target="_blank"
          rel="noreferrer">Help Page</a
        > if this issue persists.
      </p>
    {:else}
      {#if status === 'withdrawal-success'}
        <p class="text-gray-500 px-10 my-4">
          Your request to withdraw <span class="text-black">{formatCurrency(amount)}</span> to
        </p>
      {/if}
      <div class="inline-flex flex-row items-center justify-center my-4 px-10 gap-2">
        <img src={`data:image/png;base64,${achAccount.plaidInfo.institution_logo}`} alt="" class="w-8" />
        <span>
          {achAccount.plaidInfo.metadata.institution.name}
          xxxx{achAccount.plaidInfo.metadata.account.mask}
        </span>
        {#if status === 'withdrawal-success'}
          <span class="text-gray-500">has started.</span>
        {/if}
      </div>
      {#if status === 'select-amount'}
        <div class="w-full max-w-sm mt-4 px-10 text-gray-500">
          <p class="text-black">
            Withdrawable Balance <span class="font-semibold">{formatCurrency(withdrawableAmount)}</span>
          </p>
          <p class="text-xs">
            (The withdrawable amount excludes pending transactions and credit card payments less than 30 days old.)
          </p>
        </div>
        <div class="text-base mt-8 px-10 pb-1">
          <label for="withdrawalAmount" class="mb-4 inline-block text-gray-500"
            >Enter the amount you would like to withdraw</label
          >
          <Input
            variant="rounded"
            type="number"
            min="0"
            max={withdrawableAmount}
            placeholder="Enter amount"
            class="w-full bg-gray-50 py-3 mt-4"
            data-initial-focus
            bind:value={amount}
            on:change={onPriceChange}
            before="$"
          />
        </div>
      {/if}
    {/if}
    <div slot="footer" class="flex flex-col gap-4 mt-2" class:hidden={$pending}>
      {#if status === 'select-amount'}
        <Button variant="brand" on:click={onConfirm} disabled={$pending}>Confirm Withdraw</Button>
        <Button variant="base" on:click={closeModal}>Go Back</Button>
      {:else if status === 'withdrawal-success'}
        <Button variant="brand" class="mb-4" on:click={closeAllModals}>Back to My Wallet</Button>
      {:else if status === 'withdrawal-error'}
        <Button variant="brand" on:click={onConfirm} disabled={$pending}>Try Again</Button>
        <Button variant="outline-brand" on:click={() => closeModals(2)}>Select Another Withdrawal Method</Button>
      {/if}
    </div>
  </Modal>
{/if}
