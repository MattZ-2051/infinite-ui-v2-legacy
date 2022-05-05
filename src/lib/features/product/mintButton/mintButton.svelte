<script lang="ts">
  import type { StatusMintButton } from './types';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import ToMint from '../assets/toMint';
  import Processed from '../assets/viewOpenSea';
  import { messages, MINT_STATUS, PROCESSING_STATUS, UN_SOLD_STATUS } from './constants';

  export let status: StatusMintButton = MINT_STATUS;
  export let toMint: () => void;
  export let processed: () => void;
  let title: string = messages.toMint;

  $: title = status !== UN_SOLD_STATUS ? messages[status] : '';

  const handleClick = (): void => {
    status === MINT_STATUS || status === PROCESSING_STATUS ? toMint() : processed();
  };
</script>

{#if status !== UN_SOLD_STATUS}
  <button
    class="flex items-center justify-center rounded-r-md custom-button-mint-element text-xs uppercase font-bold px-6 py-8 whitespace-nowrap flex-grow flex-shrink basis-[max-content]"
    on:click={() => handleClick()}
  >
    {#if status !== 'processing'}
      <Icon path={status === MINT_STATUS ? ToMint : Processed} alt={status} class="mr-2" />
    {/if}
    {title}
    {#if status === 'processing'}
      <div class="ml-2">
        <DualRingLoader --lds-size="1.8rem" />
      </div>
    {/if}
  </button>
{/if}

<style lang="postcss">
  .custom-button-mint-element {
    background: var(--product-mint-button-bg, transparent);
    width: 100%;
    color: var(--default-color);
  }

  .custom-button-mint-element:hover {
    color: var(--button-brand-color-hover);
    background: var(--product-mint-button-bg-hover, var(--button-brand-bg-color-hover));
  }

  .custom-button-mint-element {
    letter-spacing: var(--product-mint-button-letter-spacing, revert);
  }
</style>
