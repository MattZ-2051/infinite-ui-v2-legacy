<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import Image from '$ui/image/Image.svelte';
  import SevaImage from './assets/SevaImage.png?w=400;800&format=avif;webp;png&metadata=src;format;width;height';
  import Line from './assets/Line.png?w=400;800;1200&format=avif;webp;png&metadata=src;format;width;height';
</script>

<div class="pt-16 md:pt-24 flex justify-center" style="background-color:#FFD54E;">
  <div class="container flex flex-col-reverse items-center lg:flex-row max-w-7xl relative z-1 px-6">
    <div class="w-full flex flex-col pt-8 max-w-2xl lg:mr-8 mt-8 items-center lg:items-baseline lg:w-1/3 xl:w-5/12">
      <div class="font-semibold text-4xl mb-6 sm:text-6xl sm:mb-8 text-center lg:text-left">
        Using NFTs to connect, inspire and move us into action
      </div>
      <div>
        <div class="font-semibold text-xl mb-4 text-center lg:text-left opacity-80">
          "In early 2011 I was struck by the first of two brain haemorrhages.
        </div>
        <div class="mb-4 font-normal text-center lg:text-left opacity-80">
          I am hardly unique or alone in that. 1 in 3 people will suffer a brain injury in their lifetime. That number
          is huge. It’s almost double the number of people who will develop dementia. It’s shocking to me - and you too,
          probably - that such a common health problem is so little known and barely spoken about. I made a full
          recovery but many more people don't, and I want to break the silence on this common, silent and devastating
          condition."
        </div>
        <div class="mb-8 font-normal text-center lg:text-left opacity-70">
          "When you suffer a brain injury your life is saved by emergency medical services, but in most countries,
          ongoing recovery care can be hard to find, extremely limited or simply unavailable. We need to change that.
          It’s why I founded SameYou and campaign for your support."
          <br /><span class="font-semibold opacity-100">- Emilia Clarke</span>
        </div>
      </div>
      <Button
        on:click={() => goto('/collection/EmiliaClarke-SameYou')}
        --button-padding="12px 32px"
        --button-border-radius="999px"
        --button-brand-bg-color="rgba(0,0,0)"
        --button-brand-color="rgba(255,255,255)"
        --button-brand-border-color-hover="#7852FD"
        --button-brand-border-color="transparent"
        --button-brand-bg-color-hover="#7852FD"
        --button-brand-color-hover="rgba(255,255,255)"
        animate={false}
        variant="brand"
        class="whitespace-nowrap w-56 py-12 md:py-0"
        type="submit"
      >
        View Emilia's Collection</Button
      >
    </div>
    <div class="w-full lg:w-2/3 xl:w-7/12 ">
      <Image src={SevaImage} alt="SevaImage" />
    </div>
  </div>
  <div class="line-top h-0 w-full absolute">
    <Image src={Line} alt="line" class="w-full relative z-0 left-0 top-32 sm:top-56 md:top-80 xl:top-96 lg:top-96" />
  </div>
</div>
