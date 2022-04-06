<script lang="ts">
  import type { StatusMintButton } from './types';
  import Icon from '$ui/icon/Icon.svelte';
  import ToMint from '../assets/toMint';
  import Processed from '../assets/viewOpenSea';
  import { messages, MINT_STATUS, UN_SOLD_STATUS } from './constants';

  export let status: StatusMintButton = MINT_STATUS;
  export let toMint: () => void;
  export let processed: () => void;
  let title: string = messages.toMint;

  $: title = status !== UN_SOLD_STATUS ? messages[status] : '';

  const handleClick = (): void => {
    status === MINT_STATUS ? toMint() : processed();
  };

  const buttonStatusClasses = status === MINT_STATUS ? 'text-sm' : 'text-xs font-semibold px-9';
  const iconStatusProperties =
    status === MINT_STATUS
      ? {}
      : {
          style:
            'height: var(--product-processed-mint-button-icon-height, 24px); margin-right: var(--product-processed-mint-button-icon-margin);',
        };
</script>

{#if status !== UN_SOLD_STATUS}
  <button
    class={`flex items-center justify-center rounded-r-md custom-button-mint-element ${buttonStatusClasses}`}
    on:click={() => handleClick()}
  >
    <Icon path={status === MINT_STATUS ? ToMint : Processed} alt={status} class="mr-2" {...iconStatusProperties} />
    {title}
  </button>
{/if}

<style lang="postcss">
  .custom-button-mint-element {
    background: var(--product-mint-button-bg, transparent);
    min-height: 5rem;
    width: 100%;
    height: 100%;
    color: var(--default-color);
  }

  .custom-button-mint-element:hover {
    color: var(--button-brand-color-hover);
    background: var(--product-mint-button-bg-hover, var(--button-brand-bg-color-hover));
  }

  .custom-button-mint-element.mint-btn-processed {
    letter-spacing: var(--product-processed-mint-button-letter-spacing);
  }
</style>
