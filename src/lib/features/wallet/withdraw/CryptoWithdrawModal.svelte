<script lang="ts">
  import { Modal, closeModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { formatCurrency, cryptoCurrencySymbols } from '$util/format';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import { isEthAddress } from '$util/validateEthAddress';
  import { CLIENT_COMPANY_NAME_LEGAL } from '$project/variables';
  import { cryptoWithdrawFx } from './account-withdraw/account-withdraw.store';

  export let isOpen: boolean;
  export let currency: 'ETH' | 'USDC';
  export let withdrawableBalance;

  $: currencySymbol = cryptoCurrencySymbols[currency];

  let amount: number;
  let targetAddress: string;
  let acceptedTerms: boolean;

  const pending = cryptoWithdrawFx.pending;

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

    if (amount > withdrawableBalance) {
      toast.danger(`The amount can’t be higher than the widthrawable balance.`);
      return;
    }

    if (!isEthAddress(targetAddress)) {
      toast.danger('Please enter a valid ERC20 address.');
      return;
    }

    await cryptoWithdrawFx({
      amount: amount.toString(),
      targetAddress,
      currency,
    });
    closeModal();
  };
</script>

{#if isOpen}
  <Modal title={`${currency} Withdrawal`} class="max-w-lg">
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <div class="text-black">
        Withdrawable Balance <span class="font-semibold">{formatCurrency(withdrawableBalance, { currency })}</span>
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
          max={withdrawableBalance}
          placeholder="Enter amount"
          class="bg-gray-50 py-3"
          data-initial-focus
          bind:value={amount}
          on:change={onPriceChange}
          before={currencySymbol}
        />
      </div>
      <div class="mt-8">
        <div class="text-black-opacity-50 text-base mb-4">
          Enter the wallet ERC20 address to send {currency} to
        </div>
        <Input
          variant="rounded"
          type="text"
          id="address"
          placeholder={`Enter ${currency} Address`}
          class="bg-gray-50 py-3"
          bind:value={targetAddress}
        />
      </div>
      <div class="mt-8">
        <label class="inline-flex">
          <input type="checkbox" bind:checked={acceptedTerms} class="border-gray-400 border-2 text-black mt-1.5 mr-2" />
          <div class="text-black-opacity-50 text-base">
            I have access to the above wallet and {CLIENT_COMPANY_NAME_LEGAL} is not responsible for funds sent to this address.
          </div>
        </label>
      </div>
      <div class="flex mt-4 flex-col">
        <Button variant="brand" on:click={onConfirm} disabled={!acceptedTerms || $pending}
          >Submit Withdrawal Request</Button
        >
        <Button variant="outline-brand" class="mt-4" on:click={closeModal}>Go Back</Button>
      </div>
    </div>
  </Modal>
{/if}
