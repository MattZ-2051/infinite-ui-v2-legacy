<script lang="ts">
  import logo from '$static/logo-white.png?w=200&format=avif;webp;png&metadata';
  import Image from '$ui/image/Image.svelte';
  import SidebarToggle from '$ui/sidebar-toggle/SidebarToggle.svelte';
  import Sidebar from './Sidebar.svelte';
  import Links from './Links.svelte';

  let showSidebar = false;
</script>

<div class="bg-black text-gray-300 w-full h-20 flex">
  {#if showSidebar}
    <div class="fixed top-0 right-0 left-0 bottom-0 z-40 md:hidden">
      <Sidebar on:close={() => (showSidebar = false)} />
    </div>
  {/if}
  <div class="container flex justify-between items-center md:items-end py-2">
    <a href="/" class="self-center flex gap-1 mr-3 items-end"
      ><Image src={logo} alt="ARIA" /><img
        src="/suku-white.svg"
        alt="Powered by SUKU"
        width="110"
        loading="lazy"
        class="relative"
        style="top: 2px"
      /></a
    >
    <SidebarToggle
      isOpen={showSidebar}
      on:toggle={(event) => (showSidebar = event.detail)}
      class="md:hidden hover:text-white"
    />
    <div class="hidden md:flex gap-1 md:gap-6 lg:gap-12">
      <Links />
    </div>
  </div>
</div>
