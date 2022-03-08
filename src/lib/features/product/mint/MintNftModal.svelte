<script lang="ts">
  import type { MintingStatus } from './types';
  import type { Product } from '$lib/sku-item/types';
  import { Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { connectWallet, getWalletInfo, walletConnected } from '$lib/user';
  import MintStatus from './MintStatus.svelte';
  import MintEthAddress from './MintEthAddress.svelte';

  export let product: Product;

  let mintingStatus: MintingStatus = 'unclaimed';
  let trxHash = '';
  let isLoading = false;

  const mockMintNftAPI = (address: string): Promise<string> => {
    if (address) {
      return new Promise((resolve) => {
        setTimeout(() => resolve('0x3c47ce1f1db2317dc82ab3a254b18a78c28a3a744afbe7d7b7569cd57132806e'), 1500);
      });
    }
  };

  const mintNft = async (address: string) => {
    isLoading = true;
    const trxHashResponse = await mockMintNftAPI(address);
    isLoading = false;
    trxHash = trxHashResponse;
    mintingStatus = 'error';
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

<Modal class="max-w-lg px-10 py-8" closeButton={mintingStatus === 'unclaimed' || mintingStatus === 'error'}>
  {#if mintingStatus === 'unclaimed'}
    <MintEthAddress {handleSubmit} {isLoading} />
  {:else}
    <MintStatus {mintingStatus} {trxHash} name={product.sku.name} />
  {/if}
</Modal>
