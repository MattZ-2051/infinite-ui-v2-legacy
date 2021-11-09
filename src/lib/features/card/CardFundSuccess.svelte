<script lang="ts">
  import { Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';
  import { wallet } from '$lib/features/wallet/wallet.store';
  import { formatCurrency } from '$util/format';

  export let isOpen;
</script>

{#if isOpen}
  <Modal>
    <div slot="title"><span class="text-3xl pr-8 font-semibold">Success!</span></div>
    <div class="flex flex-col justify-center items-start gap-4 mt-2 text-base max-w-sm py-4 px-10 m-auto">
      <div class="text-base pb-4" style="color: #A8C039">
        <span>Your wallet balance is {formatCurrency($wallet?.balanceInfo[0]?.totalBalance)} now.</span>
      </div>
      <div class="text-gray-300 text-base">Your funds have officially been added.</div>
      <div class="flex flex-col gap-4 w-full pb-2 pt-4">
        <Button variant="brand" href={routes.marketplace}>Explore Marketplace</Button>
        <Button variant="outline-brand" href={routes.wallet}>View Wallet</Button>
      </div>
    </div>
  </Modal>
{/if}
