<script lang="ts">
  import type { ImageMetadata } from '$ui/image/Image.svelte';
  import mdiChevronRight from '$lib/features/wallet/assets/chevron-right';
  import { Modal, openModal } from '$ui/modals';
  import { variables } from '$lib/variables';

  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import AchWithdrawModal from './AchWithdrawModal.svelte';
  import UsdcWithdrawModal from './UsdcWithdrawModal.svelte';
  import usdcImg from './assets/usdcoin.png?w=60&format=avif;webp;png&metadata=src;format;width;height';
  import achImg from './assets/bank.png?w=60&format=avif;webp;png&metadata=src;format;width;height';

  export let isOpen: boolean;

  type WithdrawOption = {
    id: 'ach' | 'usdc';
    title: string;
    subtitle: string;
    alt: string;
    image: ImageMetadata[];
    disabled?: boolean;
  };

  let options: WithdrawOption[] = [
    { id: 'usdc', title: 'USDC Coin', subtitle: 'Withdraw to USDC address', image: usdcImg, alt: 'USDC withdraw' },
  ];
  if (variables.achEnabled)
    options.push({ id: 'ach', title: 'ACH', subtitle: 'Withdraw to bank account', image: achImg, alt: 'ACH withdraw' });

  const handleWithdrawSelection = (id) => {
    if (id === 'ach') {
      openModal(AchWithdrawModal);
    } else if (id === 'usdc') {
      openModal(UsdcWithdrawModal);
    }
  };
</script>

{#if isOpen}
  <Modal title="USD Withdrawal">
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      {#each options as option (option.id)}
        <div
          class="{option.disabled
            ? 'opacity-80'
            : 'group hover:border-black cursor-pointer'} flex gap-6 items-center py-6 border-b border-gray-300"
          on:click={() => handleWithdrawSelection(option.id)}
        >
          <Image src={option.image} alt={option.alt} class="flex-none w-12 h-12" />
          <div class="flex-grow ">
            <div class="text-black">{option.title}</div>
            <div class="text-gray-500 font-bold">{option.subtitle}</div>
          </div>
          <div class="flex-none opacity-50 group-hover:opacity-100">
            <Icon path={mdiChevronRight} size="1.4" />
          </div>
        </div>
      {/each}
    </div>
  </Modal>
{/if}
