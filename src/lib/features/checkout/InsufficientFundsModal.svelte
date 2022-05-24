<script lang="ts">
  import { Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';

  export let title = 'Insufficient funds';
  export let totalCost = '';
  export let insufficientFunds = '';
  export let handleDeposit: () => void;
  export let handleOtherPaymentMethod: () => void;
  export let closeModal: () => void;

  const deposit = () => {
    closeModal();
    handleDeposit();
  };

  const selectOtherPaymentMethod = () => {
    closeModal();
    handleOtherPaymentMethod();
  };
</script>

<Modal class="max-w-lg" onClose={closeModal}>
  <svelte:fragment slot="title"><span class="font-medium text-2xl">{title}</span></svelte:fragment>
  <div class="px-10 py-8">
    <span class="text-base text-gray-500 font-medium"
      >To complete your purchase you need to deposit more funds to your balance.</span
    >
  </div>
  <div class="px-10 text-base font-medium">
    <div class="flex justify-between pb-2">
      <p>Total cost:</p>
      <p class="text-lg">${totalCost}</p>
    </div>
    <div class="flex justify-between">
      <p class="text-error">Insufficient funds:</p>
      <p class="text-lg text-error">${insufficientFunds}</p>
    </div>
  </div>
  <div class="flex flex-col p-10 text-base">
    <Button variant="brand" class="mb-10" on:click={() => deposit()}>Deposit</Button>
    <Button variant="outline-brand" on:click={() => selectOtherPaymentMethod()}>Select Another Payment Method</Button>
  </div>
</Modal>
