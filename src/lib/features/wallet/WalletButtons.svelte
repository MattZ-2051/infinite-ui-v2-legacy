<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '$lib/components/Button.svelte';
  import { openModal } from '$ui/modals';
  import tooltip from '$ui/tooltip';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import { MY_WALLET_BUTTONS_DISABLED_MESSAGE } from '$project/variables';
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
  const MY_WALLET_SECTION_DISABLED = import.meta.env?.VITE_MY_WALLET_SECTION_DISABLED === 'true';
</script>

<div
  class="flex flex-col custom-wallet-button"
  use:tooltip={MY_WALLET_SECTION_DISABLED ? MY_WALLET_BUTTONS_DISABLED_MESSAGE : ''}
>
  <div class="flex justify-center w-full mb-4">
    <Button
      variant="brand"
      disabled={MY_WALLET_SECTION_DISABLED}
      class="text-xl font-medium w-full"
      on:click={() => showInfoModal('deposit')}
      --button-padding="22px 40px"
      sveltekit:noscroll>DEPOSIT</Button
    >
  </div>
  <div class="flex justify-center">
    <Button
      variant="brand"
      disabled={MY_WALLET_SECTION_DISABLED}
      class="text-xl font-medium w-full"
      on:click={() => showInfoModal('withdraw')}
      --button-padding="22px 40px"
      sveltekit:noscroll>WITHDRAW</Button
    >
  </div>
</div>

<style lang="postcss">
  @media screen and (max-width: 768px) {
    .custom-wallet-button {
      display: var(--display-wallet-buttons-mobile, flex);
    }
  }
</style>
