<script lang="ts">
  import aria from '$static/aria-white.png?w=199&format=avif;webp;png&metadata';
  import Image from '$ui/image/Image.svelte';
  import Sidebar from './Sidebar.svelte';
  import Links from './Links.svelte';
  import SidebarToggle from './SidebarToggle.svelte';

  let showSidebar = false;
</script>

<div class="bg-black text-gray-300 w-full h-20 flex">
  {#if showSidebar}
    <div class="fixed top-0 right-0 left-0 bottom-0 z-40 md:hidden">
      <Sidebar on:close={() => (showSidebar = false)} />
    </div>
  {/if}
  <div class="container flex justify-between items-center md:items-end py-2">
    <a href="/"><Image src={aria} alt="ARIA" /></a>
    <div class="md:hidden flex justify-center cursor-pointer " on:click={() => (showSidebar = !showSidebar)}>
      <SidebarToggle isOpen={showSidebar} />
    </div>

    <div class="hidden md:flex gap-1 md:gap-6 lg:gap-12">
      <Links />
    </div>
  </div>
</div>
