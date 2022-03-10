<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { connectWallet, getWalletInfo, walletConnected } from '$lib/user';
  import MintStatus from './MintStatus.svelte';
  import MintEthAddress from './MintEthAddress.svelte';
  import { pendingTxStatus, txState } from '../product.store';

  export let product: Product;

  let mintingStatus: 'unclaimed' | 'processing' = 'unclaimed';
  let isLoading = false;

  $: txStatus = $txState.status;
  $: txHash = $txState.hash;

  const mockMintNftAPI = (address: string): Promise<string> => {
    if (address) {
      return new Promise((resolve) => {
        setTimeout(() => resolve('0xda67e2b1d3995d483be2de5dfcf944a056d2d9f2c05a3ff59cae55da1eb2b58b'), 1500);
      });
    }
  };

  const mintNft = async (address: string) => {
    isLoading = true;
    const txHashResponse = await mockMintNftAPI(address);
    mintingStatus = 'processing';
    pendingTxStatus(txHashResponse);
    isLoading = false;
  };

  const tryAgain = () => {
    mintingStatus = 'unclaimed';
  };

  const handleSubmit = async ({ radioValue, address }) => {
    if (radioValue === 'metamask' && !$walletConnected) {
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
          window.open('https://metamask.io/download/', '_blank').focus();
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

<Modal class="max-w-lg px-10 py-8" closeButton={mintingStatus === 'unclaimed' || txStatus === 'error'}>
  {#if mintingStatus === 'unclaimed'}
    <MintEthAddress {handleSubmit} {isLoading} />
  {:else}
    <MintStatus name={product.sku.name} {tryAgain} {txStatus} {txHash} />
  {/if}
</Modal>
