<script lang="ts">
  import { page } from '$app/stores';
  import { Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { walletConnected, disconnectWallet, handleWalletConnection } from '$lib/web3';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { mobileAndTabletCheck } from '$util/detectMobile';

  export let isOpen: boolean;

  const handleMetaMaskButton = async () => {
    if ($walletConnected) {
      await disconnectWallet();
    } else {
      try {
        const result = await handleWalletConnection();
        if (result) {
          toast.success('MetaMask Connected', { toastId: 'walletConnect' });
        }
      } catch (error) {
        if (error?.code) {
          toast.danger(error?.message, { toastId: error?.code });
        } else if (error?.message?.includes('You need to change your MetaMask network')) {
          toast.warning(error?.message, { toastId: 'WRONG_NETWORK' });
        } else {
          toast.danger(error?.message, { toastId: 'MM-NOT-FOUND' });
          if (typeof window !== 'undefined' && mobileAndTabletCheck()) goto(routes.index);
          typeof window !== 'undefined' &&
            window.open(`https://metamask.app.link/dapp/${$page.url.href}`, '_blank').focus();
        }
      }
    }
  };
</script>

{#if isOpen}
  <Modal title="Connect your wallet" class="max-w-lg">
    <div class="px-10 pb-10 flex flex-col">
      <p class="text-gray-400 mt-8">Connect with one of our available wallet providers or create a new one.</p>
      <Button variant={'brand'} on:click={handleMetaMaskButton} class="relative mt-8">
        <span>{$walletConnected ? 'Disconnect MetaMask' : 'Connect MetaMask'}</span>
      </Button>
    </div>
  </Modal>
{/if}
