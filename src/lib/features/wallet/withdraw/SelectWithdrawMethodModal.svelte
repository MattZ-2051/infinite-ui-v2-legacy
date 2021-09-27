<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { Modal, closeModal, openModal } from '$ui/modals';
  import Image from '$ui/image/Image.svelte';
  import AchWithdrawModal from './AchWithdrawModal.svelte';
  import UsdcWithdrawModal from './UsdcWithdrawModal.svelte';
  import usdcImg from './assets/usdcoin.png?w=60&format=avif;webp;png&metadata';
  import achImg from './assets/bank.png?w=60&format=avif;webp;png&metadata';

  export let isOpen: boolean;

  $: title = 'Withdraw';

  const handleWithdrawSelection = (event) => {
    if (event.target.id === 'ach') {
      openModal(AchWithdrawModal);
    }

    if (event.target.id === 'usdc') {
      openModal(UsdcWithdrawModal);
    }
  };
</script>

{#if isOpen}
  <Modal {title} on:close={closeModal}>
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <div class="text-black-opacity-50 text-base">Select a method to withdraw your funds to</div>
      <button
        id="ach"
        type="button"
        class="w-full grid grid-cols-2 auto-cols-fr place-content-between items-center gap-4 border-black rounded-2xl border-2 overflow-hidden p-2 text-xl mt-8"
        on:click={handleWithdrawSelection}
      >
        <div class="flex items-center">
          <Image src={achImg} alt="ACH withdraw" width={40} height={40} class="mr-4" />
          <span class="font-semibold">ACH</span>
        </div>
        <Icon path={mdiArrowRight} class="text-black justify-self-end" />
      </button>
      <button
        id="usdc"
        type="button"
        class="w-full grid grid-cols-2 auto-cols-fr place-content-between items-center gap-4 border-black rounded-2xl border-2 overflow-hidden p-2 text-xl"
        on:click={handleWithdrawSelection}
      >
        <div class="flex items-center">
          <Image src={usdcImg} alt="USDC withdraw" width={40} height={40} class="mr-4" />
          <span class="font-semibold">USDC</span>
        </div>
        <Icon path={mdiArrowRight} class="text-black justify-self-end" />
      </button>
    </div>
  </Modal>
{/if}
