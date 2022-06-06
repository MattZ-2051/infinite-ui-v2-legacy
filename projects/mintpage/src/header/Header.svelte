<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { SocialLinks } from '$lib/layout/footer';
  import { User } from '$lib/user/types';
  import { openModal } from '$ui/modals';
  import { links } from '$project/social/social-links';
  import { MP_CONNECT_WALLET } from '$project/variables';
  import Sidebar from '$project/sidebar/Sidebar.svelte';
  import WalletConnectionModal from '$lib/features/connect-wallet-extensions/WalletConnectionModal.svelte';
  import Logo from '$project/assets/Logo.svelte';
  import Discord from '$project/social/Discord.svelte';
  import Hamburger from './Hamburger.svelte';

  let showSidebar = false;
  export let user: User;

  const handleWalletModal = () => {
    openModal(WalletConnectionModal, { user });
  };
</script>

<header class="z-1 border-b-[1px] border-[rgba(0,0,0,0.2)] lg:border-0">
  <div class="bg-transparent">
    <Sidebar
      visible={showSidebar}
      closeSidebar={() => {
        showSidebar = false;
      }}
      handleWallet={handleWalletModal}
    />
    <div class="container flex justify-between">
      <div class="flex items-center text-black">
        <Logo />
      </div>
      <div class="flex gap-4 lg:gap-8 items-center text-white">
        <Button on:click={handleWalletModal} class="text-xs text-right hidden sm:block !p-0">
          {MP_CONNECT_WALLET}
        </Button>
        <Discord />
        <div class="flex items-center gap-2 justify-end">
          <SocialLinks {links} />
        </div>
        <Button
          on:click={() => {
            showSidebar = true;
          }}
          class="block !p-0 lg:hidden"
        >
          <Hamburger />
        </Button>
      </div>
    </div>
  </div>
</header>

<style>
  header {
    height: var(--header-height);
  }
</style>
