<script lang="ts">
  import type { ImageMetadata } from '$ui/image/Image.svelte';
  import mdiChevronRight from '$lib/features/wallet/assets/chevron-right';

  import { Modal } from '$ui/modals';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { variables } from '$lib/variables';

  import EthCoin from './assets/ethcoin-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
  import usDollar from './assets/usdollar-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';

  export let isOpen: boolean;
  export let onCurrencySelect: (id: 'eth-native' | 'usd') => void;

  type CurrencyOption = {
    id: 'eth-native' | 'usd';
    title: string;
    subtitle: string;
    image: ImageMetadata[];
  };

  const options: CurrencyOption[] = [
    { id: 'eth-native', title: 'From ETH balance', subtitle: 'To an ETH wallet address', image: EthCoin },
    {
      id: 'usd',
      title: 'From USD balance',
      subtitle: `To your ${variables.achEnabled ? 'bank or' : ''} USDC address`,
      image: usDollar,
    },
  ];
</script>

{#if isOpen}
  <Modal title="Withdraw">
    <div class="mx-10">
      <span class="text-gray-400">You can withdraw funds to your account from your ETH or USD balance.</span>
      <ul class="flex flex-col mt-4 mb-8 text-base divide-y divide-gray-300">
        {#each options as option (option.id)}
          <li
            class="group hover:border-black cursor-pointer flex flex-row items-center space-x-8 py-8"
            on:click={() => onCurrencySelect(option.id)}
          >
            <Image src={option.image} />
            <div class="flex-grow">
              <h3>{option.title}</h3>
              <p class="text-gray-400 max-w-sm">{option.subtitle}</p>
            </div>
            <Icon path={mdiChevronRight} size="1.4" class="flex-none opacity-50 group-hover:opacity-100" />
          </li>
        {/each}
      </ul>
    </div>
  </Modal>
{/if}
