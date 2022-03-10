<script lang="ts">
  import type { StatusMintButton } from './types';
  import ToMint from '../assets/toMint.svg';
  import Processed from '../assets/viewOpenSea.svg';
  import { messages, PROCESSING_STATUS, MINT_STATUS } from './constants';

  export let status: StatusMintButton = MINT_STATUS;
  export let toMint: () => void;
  export let processed: () => void;
  let title: string = messages.toMint;

  $: title = messages[status];

  const handleClick = (): void => {
    status === MINT_STATUS ? toMint() : processed();
  };
</script>

<button
  disabled={status === PROCESSING_STATUS}
  class="flex items-center justify-center rounded-r-md custom-button-mint-element text-base "
  on:click={() => handleClick()}
>
  {#if status !== PROCESSING_STATUS}
    <img src={status === MINT_STATUS ? ToMint : Processed} alt={status} />
  {/if}
  {title}
</button>

<style lang="postcss">
  .custom-button-mint-element {
    background-color: var(--collector-item-bg);
    width: 17.563rem;
    height: 5rem;
    color: var(--default-color);
  }
  .custom-button-mint-element:hover {
    color: var(--button-brand-color-hover);
    background-color: var(--button-brand-bg-color-hover);
    border-color: var(--button-brand-border-color-hover);
  }
</style>
