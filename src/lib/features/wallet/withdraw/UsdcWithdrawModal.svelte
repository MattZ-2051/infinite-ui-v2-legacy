<script lang="ts">
  import { Modal, closeModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { formatCurrency } from '$util/format';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import { usdcWithdrawFx } from './account-withdraw/account-withdraw.store';
  import { withdrawableBalance } from '../wallet.store';

  export let isOpen: boolean;

  let amount: number;
  let usdcAddress: string;

  const pending = usdcWithdrawFx.pending;

  const onPriceChange = () => {
    if (amount < 0) {
      amount = 0;
    }
  };

  const onConfirm = async () => {
    if (!amount || amount <= 0) {
      toast.danger(`Please, provide a valid amount.`);
      return;
    }

    if (amount > $withdrawableBalance) {
      toast.danger(`Cannot withdraw more than ${formatCurrency($withdrawableBalance)}.`);
      return;
    }

    const isValidAddress = /^0x[\da-f]{40}$/.test(usdcAddress?.toLowerCase());

    if (!isValidAddress) {
      toast.danger('Please enter a valid Ethereum mainnet address that accepts ERC20 deposits.');
      return;
    }

    await usdcWithdrawFx({ amount: amount.toString(), usdcAddress });
    closeModal();
  };
</script>

{#if isOpen}
  <Modal title="USDC Withdrawal" class="max-w-lg">
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <div class="text-black">
        Withdrawable Balance <span class="font-semibold">{formatCurrency($withdrawableBalance)}</span>
      </div>
      <div class="text-black-opacity-50 text-base">
        (The withdrawable amount excludes pending transactions and credit card payments less than 30 days old.)
      </div>
      <div class="mt-8">
        <div class="text-black-opacity-50 text-base mb-4">Enter the amount you would like to withdraw</div>
        <Input
          variant="rounded"
          id="amount"
          type="number"
          min="0"
          max={$withdrawableBalance}
          placeholder="Enter amount"
          class="bg-gray-50 py-3"
          data-initial-focus
          bind:value={amount}
          on:change={onPriceChange}
          before="$"
        />
      </div>
      <div class="mt-8">
        <div class="text-black-opacity-50 text-base mb-4">Enter the USDC address you will transfer the funds to</div>
        <Input
          variant="rounded"
          type="text"
          id="address"
          placeholder="Enter USDC address"
          class="bg-gray-50 py-3"
          bind:value={usdcAddress}
        />
      </div>
      <div class="mt-8">
        <div class="text-black-opacity-50 text-base mb-4">
          This needs to be your USDC (Ethereum mainnet) address. If you enter an incorrect address then these funds may
          not be recoverable.
        </div>
      </div>
      <div class="flex mt-8 flex-col">
        <Button variant="brand" on:click={onConfirm} disabled={$pending}>Submit Withdrawal Request</Button>
        <Button variant="outline-brand" class="mt-8" on:click={closeModal}>Go Back</Button>
      </div>
    </div>
  </Modal>
{/if}
