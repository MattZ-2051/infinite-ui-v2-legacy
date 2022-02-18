<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import featuredImg from './images/featured-collection-img.svg';
  import featuredImgMobile from './images/featured-collection-img-mobile.svg';
</script>

<div class="content-height w-full relative">
  <div class="h-2/3 bg-black w-full absolute top-0" />
  <div class="h-full w-full text-white flex justify-center items-center container">
    <div class="z-10 text-center">
      <p class="text-base sm:text-lg font-light pb-2 uppercase second-font" style="letter-spacing: 0.2em;">
        featured collection
      </p>
      <p class="text-3xl sm:text-5xl font-light pb-8 tracking-widest second-font">
        McLAREN <br class="inline sm:hidden" /> F1 CLASSICS
      </p>
      <p class="text-xs sm:text-base font-light px-2 md:px-0 max-w-lg md:max-w-2xl text-center leading-5 sm:leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
        sollicitudin sed. Nunc sed purus et nunc sollicitudin.
      </p>
      <Button
        variant="brand"
        class="w-52 h-12 sm:w-64 sm:h-16 text-xs font-bold mt-10 uppercase "
        --button-brand-bg="linear-gradient(161.99deg, #FFFFFF -1.04%, #F8F8F8 111.86%)">explore now</Button
      >
    </div>
  </div>
  <img
    src={featuredImg}
    class="content-height absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:inline hidden"
    alt=""
  />
  <img
    src={featuredImgMobile}
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full inline sm:hidden"
    alt=""
  />
</div>

<style lang="postcss">
  .content-height {
    height: 60rem;
  }

  @screen sm {
    .content-height {
      height: 50rem;
    }
  }
</style>
