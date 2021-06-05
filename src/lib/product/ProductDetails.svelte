<script lang="ts">
  import Rarity from '$lib/rarity/Rarity.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import Gallery from '$lib/gallery/Gallery.svelte';
  import { mdiChevronLeft } from '@mdi/js';
</script>

<div class="flex flex-col bg-white">
  <Gallery
    featuredImage="/gobleTrottles.png"
    images={['/gobleTrottles.png', '/cut.png', '/gobleTrottles.png']}
  />
  <div class="px-6 lg:px-8 flex-grow">
    <div class="flex flex-col py-7 border-b border-gray-200 text-black gap-4">
      <div class="flex flex-wrap justify-between text-2xl">
        <span class="text-gray-400"> Globetrotters </span>
        <Rarity rarity="Legendary" />
      </div>
      <span class="text-5xl lg:mb-12">TheOriginal - Retro</span>
      <span class="text-lg">MasterSeries</span>
      <div class="flex gap-2">
        <span class="text-gray-400">1 of 50 Released</span>
        <div class="border border-black rounded-xl px-2 text-center">LE</div>
        <a href="/marketplace">(See All)</a>
      </div>
      <div class="flex gap-3 text-sm text-gray-400 font-black">
        <div class="font-normal">
          Created by<a href="/account" class="text-black ml-1 font-black">@KaTowns</a>
        </div>
        <span>/</span>
        <span class="text-black font-black">Be notified</span>
        <div class="toggle relative self-end w-8 h-4 bg-gray-400 rounded-lg cursor-pointer" />
      </div>
    </div>
    <a class="flex-grow flex justify-items-start my-5 text-lg" href="/marketplace">
      <Icon path={mdiChevronLeft} size="1.125" />
      <span>View release details</span>
    </a>
  </div>
</div>

<style>
  .toggle::before {
    content: '';
    @apply absolute;
    @apply top-1;
    @apply left-1;
    @apply w-2;
    @apply h-2;
    @apply rounded-full;
    @apply bg-white;
  }
</style>
