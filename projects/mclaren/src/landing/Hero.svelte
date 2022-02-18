<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import heroImg from './images/bg-hero-img.svg';
  import mobileHeroImg from './images/bg-hero-img-mobile.svg';
  import bgGradient from './images/bg-gradient-bottom-img.svg';
</script>

<img src={heroImg} alt="" class="w-full z-0 absolute h-screen object-cover hidden md:inline" />
<img src={bgGradient} alt="" class="w-full z-10 absolute h-screen object-cover content-container" />
<img src={mobileHeroImg} alt="" class="z-0 absolute md:hidden h-screen w-full content-container" />
<div class="flex justify-center h-screen content-container">
  <div class="flex items-end md:items-center relative w-full max-w-7xl px-6 pb-16">
    <div class="text-white md:max-w-3xl z-∞ w-full sm:w-3/4">
      <p class="text-base md:text-2xl font-light pb-2 uppercase second-font">defy the limits on the</p>
      <p class="text-5xl font-light pb-6 uppercase md:text-7xl second-font">metaverse</p>
      <p class="text-base md:text-xl font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
        sollicitudin sed. Nunc sed purus et nunc sollicitudin.
      </p>
      <Button
        variant="brand"
        class="text-xs w-60 h-14 sm:w-64 sm:h-16 mt-12 font-semibold tracking-widest uppercase"
        --button-brand-bg="linear-gradient(161.99deg, #FFFFFF -1.04%, #F8F8F8 111.86%)">explore the drop</Button
      >
    </div>
  </div>
</div>

<style lang="postcss">
  @media screen and (max-width: 500px) {
    .content-container {
      height: 40rem;
    }
  }

  @media screen and (max-width: 340px) {
    .content-container {
      height: 35rem;
    }
  }
</style>
