<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import SevaImage from './assets/SevaImage2x.png';
  import Line from './assets/Line.png';
</script>

<div class="pt-32 md:pt-48 flex justify-center" style="background-color:#FFD54E;">
  <div class="container flex flex-col-reverse items-center lg:flex-row max-w-7xl relative z-1 px-6">
    <div class="w-full flex flex-col pt-8 max-w-xl lg:mr-8 mt-8 items-center lg:items-baseline lg:w-1/3 lg:2/4">
      <div class="font-medium text-4xl mb-6 sm:text-6xl sm:mb-8 text-center lg:text-left">
        Using NFTs to connect, inspire and move us into action
      </div>
      <div>
        <div class="font-medium text-xl mb-4 text-center lg:text-left">
          In early 2011 I was struck by the first of two brain haemorrhages. I am hardly unique or alone in that. 1 in 3
          people will suffer a brain injury in their lifetime. That number is huge. It’s almost double the number of
          people who will develop dementia. It’s shocking to me - and you too, probably - that such a common health
          problem is so little known and barely spoken about. I made a full recovery but many more people don't, and I
          want to break the silence on this common, silent and devastating condition.
        </div>
        <div class="mb-8 font-medium text-center lg:text-left">
          When you suffer a brain injury your life is saved by emergency medical services, but in most countries,
          ongoing recovery care can be hard to find, extremely limited or simply unavailable. We need to change that.
          It’s why I founded SameYou and campaign for your support.
        </div>
      </div>
      <Button
        on:click={() => goto('/about')}
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
        class="whitespace-nowrap md:w-56 w-44 py-12 md:py-0"
        type="submit"
      >
        Why should I care?</Button
      >
    </div>
    <div class="w-full lg:w-2/3 ">
      <img src={SevaImage} alt="SevaImage" />
    </div>
  </div>
  <div class="line-top h-0 w-full absolute">
    <img src={Line} alt="line" class="w-full relative z-0 left-0 top-32 sm:top-56 md:top-80 xl:top-96 lg:top-96" />
  </div>
</div>
