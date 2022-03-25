<script lang="ts">
  import heroImg from './images/bg-hero-img.svg';
  import mobileHeroImg from './images/bg-hero-img-mobile.svg';
</script>

<img src={heroImg} alt="heroImg" class="w-full z-0 absolute h-screen object-cover hidden md:inline" />
<img src={mobileHeroImg} alt="mobileHeroImg" class="z-0 absolute md:hidden h-screen w-full content-container" />
<div class="flex justify-center h-screen content-container blur-bottom">
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

  .blur-bottom {
    background: rgba(0, 0, 0, 0)
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 25%,
        rgba(0, 0, -1, 0.25) 50%,
        rgba(0, 0, 0, 0.5) 75%,
        rgba(0, 0, 0, 1) 100%
      )
      repeat scroll 0 0;
    position: relative;
  }
</style>
