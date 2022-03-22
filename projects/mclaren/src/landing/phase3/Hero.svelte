<script lang="ts">
  import heroImg from './images/bg-hero-img.svg';
  import mobileHeroImg from './images/bg-hero-img-mobile.svg';
  import bgGradient from './images/bg-gradient-bottom-img.svg';
</script>

<img src={heroImg} alt="heroImg" class="w-full z-0 absolute h-screen object-cover hidden md:inline" />
<img src={bgGradient} alt="bgGradient" class="w-full z-10 absolute h-screen object-cover content-container" />
<img src={mobileHeroImg} alt="mobileHeroImg" class="z-0 absolute md:hidden h-screen w-full content-container" />
<div class="flex justify-center h-screen content-container">
  <div class="flex items-end md:items-center relative w-full max-w-7xl px-6 pb-16" />
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
