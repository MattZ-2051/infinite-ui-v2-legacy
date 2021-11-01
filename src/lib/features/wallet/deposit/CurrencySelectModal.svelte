<script lang="ts">
  import type { ImageMetadata } from '$ui/image/Image.svelte';
  import mdiChevronRight from '$lib/features/wallet/assets/chevron-right';

  import { Modal } from '$ui/modals';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { depositOptions } from './deposit-options';

  import EthCoin from './ethcoin-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import usDollar from './usdollar-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';

  export let isOpen: boolean;
  export let onCurrencySelect: (id: 'eth-native' | 'usd') => void;

  type CurrencyOption = {
    id: 'eth-native' | 'usd';
    title: string;
    subtitle: string;
    image: ImageMetadata[];
  };

  const options: CurrencyOption[] = [
    { id: 'eth-native', title: 'Deposit ETH', subtitle: 'Buy and bid on NFTs priced in ETH', image: EthCoin },
    {
      id: 'usd',
      title: 'Deposit USD',
      subtitle: 'Buy and bid on NFTs priced in USD',
      image: usDollar,
    },
  ];
</script>

{#if isOpen}
  <Modal title="Deposit" class="max-w-lg">
    <h3 class="text-gray-500 px-10">You can deposit funds to your account to be stored in ETH or USD.</h3>
    <ul class="flex flex-col space-y-4 mt-4 mb-8 text-base ">
      {#each options as option (option.id)}
        <li class="group cursor-pointer flex flex-col mx-10 py-6" on:click={() => onCurrencySelect(option.id)}>
          <div class="flex flex-row items-center space-x-4 sm:space-x-8">
            <Image src={option.image} class="flex-1" />
            <div class="flex-1">
              <h4 class="text-xl font-bold">{option.title}</h4>
              <p class="text-base max-w-sm">{option.subtitle}</p>
            </div>
            <Icon path={mdiChevronRight} size="1.4" class="flex-none opacity-50 group-hover:opacity-100" />
          </div>
          {#if option.id === 'usd'}
            <div class="px-14 sm:px-20">
              <p class="mt-3 text-sm text-gray-500">
                Deposit from credit card, USDC, BTC, HBAR, ETH. Crypto deposits get converted into USD currency.
              </p>
              <div class="mt-4 flex flex-row space-x-3">
                {#each depositOptions as depositOption (depositOption.id)}
                  {#if !depositOption.disabled}
                    <Image src={depositOption.image} class="flex-none w-6 h-6" />
                  {/if}
                {/each}
              </div>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </Modal>
{/if}

<style>
  li + li {
    border-top: thin solid var(--gray-200);
  }
</style>
