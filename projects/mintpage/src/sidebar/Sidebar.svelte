<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { SocialLinks } from '$lib/layout/footer';
  import { links } from '$project/social/social-links';
  import { MP_CONNECT_WALLET, MP_CLIENT_COMPANY_NAME_LEGAL } from '$project/variables';
  import Sidebar from '$lib/components/mintPage/Sidebar/Sidebar.svelte';
  import Logo from '$project/assets/Logo.svelte';
  import Discord from '$project/social/Discord.svelte';

  export let visible: boolean;
  export let closeSidebar: () => void;
  export let handleWallet: () => void;

  const onClickConnectWallet = () => {
    closeSidebar();
    handleWallet();
  };
</script>

{#if visible}
  <div class="fixed top-0 right-0 left-0 bottom-0 z-50 lg:hidden">
    <Sidebar {Logo} on:close={closeSidebar}>
      <div class="flex flex-col justify-around items-center h-screen">
        <div class="flex flex-col">
          <Button on:click={onClickConnectWallet} class="!p-0 mb-11 text-sm">
            {MP_CONNECT_WALLET}
          </Button>
          <Discord />
        </div>
        <div class="flex flex-col items-center mobile-footer">
          <div class="flex">
            <SocialLinks {links} />
          </div>
          <span class="text-sm mt-8"
            >{new Date().getFullYear()} {MP_CLIENT_COMPANY_NAME_LEGAL}. All rights reserved.</span
          >
        </div>
      </div>
    </Sidebar>
  </div>
{/if}

<style>
  .mobile-footer {
    color: var(--mobile-menu-footer-text-color);
  }
</style>
