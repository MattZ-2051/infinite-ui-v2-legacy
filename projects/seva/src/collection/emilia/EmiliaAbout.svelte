<script>
  import Button from '$lib/components/Button.svelte';
  import AboutImage from './assets/about-emilia.svg';
</script>

<div class="grid grid-cols-1 md:grid-cols-2">
  <div class="relative w-full px-4 justify-self-end pb-12" style="max-width: calc(var(--container-max-width)/2);">
    <div class="absolute bottom-0 right-0 top-0 left-0 md:left-1/4 mt-32 md:mt-20" style="background-color: #FFD54E;" />
    <div class="w-full h-full relative">
      <img src={AboutImage} alt="about" class="object-contain rounded-xs" />
    </div>
  </div>
  <div class="flex">
    <div class="w-full pb-16 pt-8 md:pt-16 pl-4 md:pl-8 mt-0 md:mt-20" style="background-color: #FFD54E;">
      <div class="border-b border-black border-opacity-20 md:text-4xl text-xl pb-8">
        <span class="pr-4" style="max-width: calc(var(--container-max-width)/2);">About Emilia’s Collection</span>
      </div>
      <div class="pr-4" style="max-width: calc(var(--container-max-width)/2);">
        <div class="mt-8 md:text-4xl text-2xl font-medium leading-10">
          SameYou’s collection features a series of NFT’s illustrating the experiential journey of healing from
          traumatic brain injury to recovery.
        </div>
        <div class="mt-8 text-base leading-7 font-medium text-black text-opacity-90">
          Your purchase of NFTs from this collection will benefit SameYou’s core mission of helping survivors while
          raising awareness about Acquired Brain Injury. Each NFT offers unique ownership benefits, with two releases
          redeemable for physical items, including the one of a kind Atelier Versace dress Emilia debuted on the red
          carpet at the 68th Emmy Awards in 2016.
        </div>
        <div class="mt-4">
          <Button variant="brand" on:click={() => window.open('https://www.sameyou.org')} class="mb-8">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>
