<script lang="ts">
  import { Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';
  import { wallet } from '$lib/features/wallet/wallet.store';
  import { formatCurrency } from '$util/format';

  export let isOpen;
</script>

{#if isOpen}
  <Modal title="Funds added!">
    <div class="flex flex-col justify-center items-start gap-4 mt-2 text-base max-w-sm py-4 px-10 m-auto">
      <div class="text-base pb-4" style="color: #A8C039">
        <span>Your wallet balance is ${formatCurrency($wallet?.balanceInfo?.totalBalance)} now.</span>
      </div>
      <div class="text-gray-500 text-base">
        Check your open tabs to refresh your previous screen to see your added funds or...<br />
      </div>
      <div class="flex flex-col gap-4 w-full pb-2 pt-4">
        <Button variant="brand" href={routes.marketplace}>Go to Marketplace</Button>
        <Button variant="outline-brand" href={routes.wallet}>View Wallet</Button>
      </div>
    </div>
  </Modal>
{/if}
