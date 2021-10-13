<script lang="ts">
  import type { ImageMetadata } from '$ui/image/Image.svelte';
  import { mdiChevronRight } from '@mdi/js';

  import { closeModal, Modal } from '$ui/modals';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';

  import Circle from './circle-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import BitCoin from './bitcoin-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import EthCoin from './ethcoin-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import USDCoin from './usdcoin-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import Suku from './suku-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import Hbar from './hbar-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';

  export let isOpen: boolean;
  export let onDepositSelect: (id: 'circle' | 'eth' | 'btc' | 'usdc' | 'hbar') => unknown;

  type DepositOption = {
    id: 'circle' | 'usdc' | 'suku' | 'hbar' | 'eth' | 'btc';
    title: string;
    subtitle: string;
    image: ImageMetadata[];
    disabled?: boolean;
  };
  const options: DepositOption[] = [
    { id: 'circle', title: 'Credit Card', subtitle: 'Deposit funds using a credit card', image: Circle },
    { id: 'btc', title: 'BTC', subtitle: 'Deposit funds using BTC', image: BitCoin },
    { id: 'eth', title: 'ETH', subtitle: 'Deposit funds using ETH', image: EthCoin },
    { id: 'usdc', title: 'USDC', subtitle: 'Deposit funds using USDC', image: USDCoin },
    { id: 'hbar', title: 'HBAR', subtitle: 'Deposit funds using HBAR', image: Hbar },
    { id: 'suku', title: 'SUKU', subtitle: 'Coming soon', image: Suku, disabled: true },
  ];

  function onSelect({ id, disabled }: DepositOption) {
    if (disabled) {
      return;
    }
    closeModal();
    onDepositSelect(id as 'circle' | 'eth' | 'btc' | 'usdc' | 'hbar');
  }
</script>

{#if isOpen}
  <Modal title="Select a payment to deposit" on:close={closeModal}>
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      {#each options as option (option.id)}
        <div
          class="{option.disabled
            ? 'opacity-80'
            : 'group hover:border-black cursor-pointer'} flex gap-6 items-center py-6 border-b border-gray-300"
          on:click={() => onSelect(option)}
        >
          <Image src={option.image} class="flex-none w-12 h-12" />
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
