<script lang="ts">
  import Logo from '$project/Logo.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import SidebarToggle from '$ui/sidebar-toggle/SidebarToggle.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import questionMark from '$lib/components/icons/question-mark';
  import { user } from '$lib/user';
  import routes from '$project/routes';
  import { CLIENT_SUPPORT_URL } from '$project/variables';
  import Links from './Links.svelte';
  import Sidebar from './Sidebar.svelte';

  let showSidebar = false;
</script>

<ThemeContext id="header">
  <header class="w-full flex flex-col">
    <div class="w-full h-full flex">
      {#if showSidebar}
        <div class="fixed top-0 right-0 left-0 bottom-0 z-40 md:hidden">
          <Sidebar user={$user} on:close={() => (showSidebar = false)} />
        </div>
      {/if}
      <div class="container flex justify-between items-center md:items-end py-3">
        <a href={routes.index} class="self-end flex gap-1 mr-3 items-end"><Logo /></a>
        <a
          href={CLIENT_SUPPORT_URL}
          target="_blank"
          rel="noreferrer"
          class="text-current ml-auto mr-3 sm:mr-5 md:hidden"
          style="margin-top: 3px;"><Icon path={questionMark} size={1.25} /></a
        >
        <SidebarToggle
          isOpen={showSidebar}
          on:toggle={(event) => (showSidebar = event.detail)}
          class="md:hidden text-default"
        />
        <div class="hidden md:flex gap-1 md:gap-5 lg:gap-12 md:items-center">
          <Links user={$user} />
        </div>
      </div>
    </div>
    <div class="separator" />
  </header>
</ThemeContext>

<style lang="postcss">
  header {
    @apply sticky top-0 z-40;
    background-color: var(--header-bg-color);
    height: var(--header-height);
  }
</style>
