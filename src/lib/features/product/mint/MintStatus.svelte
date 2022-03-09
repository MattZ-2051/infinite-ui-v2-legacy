<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import successMint from '../assets/success-mint';
  import errorMint from '../assets/error-mint';
  import { txState } from '../product.store';

  export let name: string;
  export let tryAgain: () => void;

  $: txStatus = $txState.status;
  $: txHash = $txState.hash;

  let title = '';
  let buttonText = undefined;
  let icon = undefined;

  $: switch (txStatus) {
    case 'pending': {
      title = 'Processing...';
      break;
    }
    case 'confirmed': {
      title = 'Minting successul!';
      buttonText = 'Close';
      icon = successMint;
      break;
    }
    case 'error': {
      title = 'Minting failed.';
      buttonText = 'Try again';
      icon = errorMint;
    }
  }

  const openTrx = () => {
    window.open(`https://etherscan.io/tx/${txHash}`, '_blank').focus();
  };

  const onClick = () => {
    if (txStatus === 'error') {
      tryAgain();
    } else {
      // TODO: Close modal
    }
  };

  $: shortEthTx = `${txHash.slice(0, 22)}...${txHash.slice(43, 64)}`;
</script>

<div class="grid gap-8">
  <div class="flex items-center">
    {#if icon}
      <Icon class="mr-6" viewBox="0 0 56 56" size="56px" path={icon} />
    {/if}
    <span class="font-medium text-2xl">{title}</span>
  </div>
  <span>
    {#if txStatus === 'pending'}
      You're minting <span class="font-bold">{name}</span>, it's now being confirmed on the blockchain.
    {:else if txStatus === 'confirmed'}
      You successfully minted <span class="font-bold">{name}</span>.
    {:else if txStatus === 'error'}
      There was an error in the minting process, please try again in a few minutes.
    {/if}
  </span>
  <div class="flex flex-col">
    <span>Transaction Hash</span>
    <span class="mt-2 underline font-bold cursor-pointer" on:click={openTrx}>{shortEthTx}</span>
  </div>
  <Button class="h-16 text-2xl" variant="brand" disabled={txStatus === 'pending'} on:click={onClick}>
    {#if buttonText}
      {buttonText}
    {:else}
      <DualRingLoader />
    {/if}
  </Button>
</div>
