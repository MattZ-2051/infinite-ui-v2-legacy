<script lang="ts">
  import type { ImageMetadata } from '$ui/image/Image.svelte';
  import { mdiChevronRight } from '@mdi/js';

  import { closeModal, Modal } from '$ui/modals';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';

  import Circle from './circle-avatar.png?w=48&format=avif;webp;png&metadata';
  import Coinbase from './coinbase-avatar.png?w=48&format=avif;webp;png&metadata';
  import USDCoin from './usdcoin-avatar.png?w=48&format=avif;webp;png&metadata';
  import Suku from './suku-avatar.png?w=48&format=avif;webp;png&metadata';

  export let isOpen: boolean;
  export let onDepositSelect: (id: 'circle' | 'coinbase' | 'usdc') => unknown;

  type DepositOption = {
    id: 'circle' | 'coinbase' | 'usdc' | 'suku';
    title: string;
    subtitle: string;
    image: ImageMetadata[];
    disabled?: boolean;
  };
  const options: DepositOption[] = [
    { id: 'circle', title: 'Circle', subtitle: 'Pay with credit card', image: Circle },
    { id: 'coinbase', title: 'Coinbase', subtitle: 'Pay with cryptocurrency', image: Coinbase },
    { id: 'usdc', title: 'USD Coin', subtitle: 'Pay with USDC', image: USDCoin },
    { id: 'suku', title: 'Suku', subtitle: 'Coming soon', image: Suku, disabled: true },
  ];

  function onSelect({ id, disabled }: DepositOption) {
    if (disabled) {
      return;
    }
    closeModal();
    onDepositSelect(id as 'circle' | 'coinbase' | 'usdc');
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
            <div class="text-gray-400 font-extrabold italic">{option.subtitle}</div>
          </div>
          <div class="flex-none opacity-50 group-hover:opacity-100">
            <Icon path={mdiChevronRight} size="1.4" />
          </div>
        </div>
      {/each}
    </div>
  </Modal>
{/if}
