<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import { openModal } from '$ui/modals';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import WithdrawNoticeModalBody from './WithdrawNoticeModalBody.svelte';
  import DepositNoticeModalBody from './DepositNoticeModalBody.svelte';

  const dispatch = createEventDispatcher();

  function showInfoModal(option: 'withdraw' | 'deposit') {
    openModal(ConfirmModal, {
      title: 'Notice',
      message: option === 'deposit' ? DepositNoticeModalBody : WithdrawNoticeModalBody,
      labels: { cancel: 'Go back', confirm: 'I Agree & Continue' },
      onConfirm: () => {
        dispatch(option);
      },
    });
  }
</script>

<div class="flex flex-col">
  <div class="flex justify-center w-full mb-4">
    <Button
      variant="brand"
      class="text-xl font-medium w-full"
      on:click={() => showInfoModal('deposit')}
      --button-padding="22px 40px"
      sveltekit:noscroll>DEPOSIT</Button
    >
  </div>
  <div class="flex justify-center">
    <Button
      variant="brand"
      class="text-xl font-medium w-full"
      on:click={() => showInfoModal('withdraw')}
      --button-padding="22px 40px"
      sveltekit:noscroll>WITHDRAW</Button
    >
  </div>
</div>
