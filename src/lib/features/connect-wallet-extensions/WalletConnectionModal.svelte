<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { WalletExtension } from './types';
  import { ethers } from 'ethers';
  import { page } from '$app/stores';
  import { Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { onSignIn, onSignUp, isLoading } from '$lib/user';
  import { web3User } from '$lib/web3/web3.stores';
  import { connectWallet, disconnectWallet } from '$lib/web3/web3.service';
  import {
    InfiniteExtensionLoginFx,
    InfiniteExtensionLogoutFx,
    InfiniteExtensionStore,
  } from '$lib/features/infinite-wallet/infinite-wallet.store';
  import { INFINITE_EXTENSION_ENABLED } from '$project/variables';
  import { variables } from '$lib/variables';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { mobileAndTabletCheck } from '$util/detectMobile';

  const MM_TEST_NETWORK_ENABLED = variables.metamask.testNetworkEnabled;
  const MM_WALLET_ENABLED = variables.metamask.walletEnabled;

  export let isOpen: boolean;
  export let user: User;

  const testMMNetwork = async () => {
    if (typeof window?.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');
      const metamaskNetwork = await provider.getNetwork();

      if (MM_TEST_NETWORK_ENABLED && metamaskNetwork.name !== 'goerli') {
        throw new Error('You need to change your MetaMask network to "Goerli Test Network"');
      } else if (!MM_TEST_NETWORK_ENABLED && metamaskNetwork.name !== 'homestead') {
        throw new Error('You need to change your MetaMask network to "Ethereum Mainnet"');
      }
    }
  };

  const handleWalletConnection = async () => {
    try {
      await testMMNetwork();
      await connectWallet();
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
  };

  $: wallets = [
    MM_WALLET_ENABLED && {
      name: 'MetaMask',
      connected: $web3User.walletConnected,
      login: handleWalletConnection,
      logout: disconnectWallet,
      disabled: $isLoading,
      needsLogin: false,
    },
    INFINITE_EXTENSION_ENABLED && {
      name: 'Infinite Wallet',
      connected: $InfiniteExtensionStore.loggedIn,
      login: InfiniteExtensionLoginFx,
      logout: InfiniteExtensionLogoutFx,
      disabled: user === undefined || $isLoading,
      needsLogin: true,
    },
  ];

  $: activeWallets = wallets.filter(Boolean) as WalletExtension[];
</script>

{#if isOpen}
  <Modal title="Connect your wallet" class="max-w-lg">
    <div class="px-10 pb-10 flex flex-col">
      <p class="text-gray-400 mt-8">Connect with one of our available wallet providers or create a new one.</p>
      {#each activeWallets as wallet}
        <Button
          variant={wallet.connected ? 'invert-brand' : 'brand'}
          on:click={wallet.connected ? () => wallet.logout() : () => wallet.login()}
          class="relative mt-8"
          disabled={wallet.disabled}
        >
          <span>{wallet.name}</span>
          {#if wallet.connected}
            <span
              class="uppercase font-bold text-xs absolute w-full px-6 text-right self-center"
              style="font-size: 0.625rem; letter-spacing:0.03em;"
            >
              connected
            </span>
          {/if}
        </Button>
        {#if wallet.needsLogin && user === undefined}
          <p class="text-lg mt-3 text-center">
            To use {wallet.name} you need to
            <button class="underline contents font-bold" on:click={() => onSignIn()}>login</button>
            or
            <button class="underline contents font-bold" on:click|preventDefault={onSignUp}>create a new account</button
            >.
          </p>
        {/if}
      {/each}
    </div>
  </Modal>
{/if}
