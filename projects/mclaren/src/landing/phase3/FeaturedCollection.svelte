<script lang="ts">
  import curvedBorder from './images/curved-border.svg';
  import featuredImg from './images/featured-collection-img.png';
  import featuredImgMobile from './images/featured-collection-img-mobile.png';
</script>

<div class="h-72 relative w-full mt-32 sm:mt-72">
  <img src={curvedBorder} alt="curverd-border-img" class="absolute w-full -top-10" />
  <div class="h-full flex flex-col items-center justify-end container pb-14">
    <p class="font-normal second-font text-5xl text-white uppercase" style="letter-spacing: 0.07em; line-height: 4rem;">
      upcoming collection
    </p>
    <p class="font-light text-base text-white opacity-80 max-w-xl text-left sm:text-center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la Lorem ipsum dolor
      sit amet, consectetur adipiscing elit, sed do eiusmod.
    </p>
  </div>
</div>
<div class="pb-24 sm:pb-72 bg-black">
  <div class="content-height w-full relative container">
    <div class="w-full h-full text-white flex items-end justify-center">
      <div class="z-10 h-full w-full flex flex-col max-w-4xl items-start justify-end sm:mb-20">
        <p class="text-base sm:text-xl font-light sm:pb-2 uppercase second-font" style="letter-spacing: 0.07em;">
          McLAREN 1ST
        </p>
        <p class="text-5xl sm:text-6xl font-light pb-4 sm:pb-8 tracking-widest second-font" style="line-height: 4rem;">
          CLASSICS <br class="inline sm:hidden" /> COLLECTION
        </p>
        <p class="text-base font-light px-2 md:px-0 md:max-w-5xl leading-5 sm:leading-7 hidden sm:block">
          Nam a tellus mollis nisi laoreet rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In at
          purus ut orci aliquam egestas at id arcu. Nam a tellus mollis nisi laoreet rutrum. Nam a tellus mollis nisi
          laoreet rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam a tellus mollis nisi laoreet
          rutrum.
        </p>
        <p class="text-base font-light px-2 md:px-0 md:max-w-5xl leading-7 sm:leading-7 block sm:hidden">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
          sollicitudin sed. Nunc sed purus et nunc sollicitudin.
        </p>
      </div>
    </div>
    <img
      src={featuredImg}
      class="content-height absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:inline hidden"
      alt="img featured car"
    />
    <img
      src={featuredImgMobile}
      class="content-height  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full inline sm:hidden"
      alt="img featured car"
    />
  </div>
</div>

<style lang="postcss">
  .content-height {
    height: 40rem;
    margin-bottom: -2.5rem;
  }

  @media screen and (max-width: 768px) {
    .content-height {
      height: 35rem;
    }
  }
</style>
