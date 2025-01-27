<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { connectWallet, getWalletInfo } from '$lib/web3/web3.service';
  import { web3User } from '$lib/web3/web3.stores';
  import MintStatus from './MintStatus.svelte';
  import MintEthAddress from './MintEthAddress.svelte';
  import { pendingTxStatus, txState } from '../product.store';
  import { claimMint } from '../product.api';

  export let product: Product;
  export let onClose: () => void;

  let isLoading = false;

  $: mintingStatus = $txState.status === 'pending' ? 'processing' : 'unclaimed';
  $: txStatus = $txState.status;
  $: txHash = $txState.hash;
  $: $txState.status === 'confirmed' && onClose();

  const mintNft = async (mintToAddress: string) => {
    isLoading = true;
    try {
      const txResponse = await claimMint({ id: product._id, mintToAddress });
      mintingStatus = 'processing';
      pendingTxStatus(txResponse.blockchainTransaction.transactionHash);
    } catch (error) {
      toast.danger(error.data?.message || 'An error ocurred');
    }
    isLoading = false;
  };

  const tryAgain = () => {
    mintingStatus = 'unclaimed';
  };

  const handleSubmit = async ({ radioValue, address }) => {
    if (radioValue === 'metamask' && $web3User.walletConnected) {
      try {
        await connectWallet();
        const data = await getWalletInfo();
        address = data.address;
        // Mint nft using addrees
        await mintNft(address);
      } catch (error) {
        if (error?.code) {
          toast.danger(error?.message, { toastId: error?.code });
        } else {
          toast.danger(error?.message, { toastId: 'MM-NOT-FOUND' });
          typeof window !== 'undefined' && window.open('https://metamask.io/download/', '_blank').focus();
        }
      }
    } else if (radioValue === 'metamask') {
      const data = await getWalletInfo();
      address = data.address;

      // Mint nft using addrees
      await mintNft(address);
    } else if (radioValue === 'manual') {
      await mintNft(address);
    }
  };
</script>

<Modal class="max-w-lg px-10 py-8" closeButton={mintingStatus === 'unclaimed' || txStatus === 'error'} {onClose}>
  {#if mintingStatus === 'unclaimed'}
    <MintEthAddress {handleSubmit} {isLoading} />
  {:else}
    <MintStatus name={product.name || product.sku.name} {tryAgain} {txStatus} {txHash} {onClose} />
  {/if}
</Modal>
