<script lang="ts">
  import type { DepositOption } from './deposit-options';
  import mdiChevronRight from '$lib/features/wallet/assets/chevron-right';

  import { closeModal, Modal } from '$ui/modals';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';

  import { depositOptions } from './deposit-options';

  export let isOpen: boolean;
  export let onDepositSelect: (id: 'circle' | 'eth' | 'btc' | 'usdc' | 'hbar') => unknown;

  function onSelect({ id, disabled }: DepositOption) {
    if (disabled) {
      return;
    }
    closeModal();
    onDepositSelect(id as 'circle' | 'eth' | 'btc' | 'usdc' | 'hbar');
  }
</script>

{#if isOpen}
  <Modal title="Select a deposit method">
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <h3 class="text-gray-500">
        Choose to deposit from credit card, BTC, ETH, USDC, or HBAR. Note,
        <br />
        ALL deposits will get converted into USD Coin (USDC).
      </h3>
      {#each depositOptions as option (option.id)}
        <div
          class="{option.disabled
            ? 'opacity-80'
            : 'group hover:border-black cursor-pointer'} flex gap-6 items-center py-6 border-b border-gray-300"
          on:click={() => onSelect(option)}
        >
          <Image src={option.image} class="flex-1 w-12 h-12" />
          <div class="flex-1 ">
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
