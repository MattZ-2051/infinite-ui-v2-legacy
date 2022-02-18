<script lang="ts">
  import curvedBorder from './images/curved-border.svg';
  import mclarenClassicCard from './images/mclaren-classic-collection-img.svg';
  import mclarenClassicCardMobile from './images/mclaren-classic-collection-img-mobile.svg';
  import mclarenSuperCarCard from './images/mclaren-super-cars-collection-img.svg';
  import mclarenSuperCarCardMobile from './images/mclaren-super-cars-collection-img-mobile.svg';
</script>

<div class="h-full w-full flex flex-col justify-center items-center relative container mb-32 sm:mb-0">
  <img src={curvedBorder} alt="" class="absolute top-0 w-full" />
  <div class="text-black pb-8 pt-8">
    <p
      class="font-normal tracking-widest text-3xl sm:text-5xl pb-4 text-center w-full pt-4 sm:pt-24 uppercase second-font"
    >
      featured collections
    </p>
    <p class="sm:text-justify text-base font-light sub-text second-font text-black-opacity-80 text-center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la.
    </p>
  </div>
  <div class="w-full flex flex-col lg:grid grid-cols-2 gap-x-12">
    <div class="justify-self-end justify-center flex w-full lg:w-10/12 text-white z-0 relative">
      <img
        src={mclarenClassicCard}
        alt=""
        class="absolute -z-1 -top-0 w-full img-shadow rounded-3xl img-container hidden sm:block"
      />
      <img
        src={mclarenClassicCardMobile}
        alt=""
        class="absolute -z-1 -top-0 w-full img-shadow rounded-3xl img-container block sm:hidden"
      />
      <div class="px-12 sm:pt-24 flex items-end sm:items-center text-container">
        <div class="text-white">
          <p class="tracking-wider text-xl font-normal pb-2 second-font hidden sm:block">McLAREN CLASSICS 1ST</p>
          <p class="tracking-wider text-3xl font-normal pb-2 second-font block sm:hidden">McLaren F1 Classics</p>
          <p class="text-6xl font-light pb-5 uppercase second-font hidden sm:block">collection</p>
          <p class="text-base font-light max-w-xl">
            Nam a tellus mollis nisi laoreet rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In at
            purus ut orci aliquam egestas at id arcu. Nam a tellus mollis nisi laoreet rutrum.
          </p>
        </div>
      </div>
    </div>
    <div class="justify-self-start justify-center flex w-full lg:w-10/12 text-white z-0 relative mt-12 lg:mt-0">
      <img
        src={mclarenSuperCarCard}
        alt=""
        class="absolute -z-1 top-0 w-full img-shadow rounded-3xl img-container hidden sm:block"
      />
      <img
        src={mclarenSuperCarCardMobile}
        alt=""
        class="absolute -z-1 top-0 w-full img-shadow rounded-3xl img-container block sm:hidden"
      />
      <div class="px-12 sm:pt-24 flex items-end sm:items-center text-container">
        <div class="text-white">
          <p class="tracking-wider  text-3xl sm:text-xl font-normal pb-2 second-font">McLAREN CLASSICS 1ST</p>
          <p class="text-6xl font-light pb-5 uppercase second-font hidden sm:block">collection</p>
          <p class="text-base font-light max-w-xl">
            Nam a tellus mollis nisi laoreet rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In at
            purus ut orci aliquam egestas at id arcu. Nam a tellus mollis nisi laoreet rutrum.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @media screen and (min-width: 640px) {
    .sub-text:after {
      content: '';
      display: inline-block;
      width: 100%;
    }
  }

  .img-container {
    height: 36rem;
    width: 38rem;
  }

  .text-container {
    height: 36rem;
    width: 38rem;
  }

  @media screen and (max-width: 640px) {
    .img-container {
      height: 30rem;
      width: 100%;
    }

    .text-container {
      height: 25rem;
      width: 50%;
      padding: 0;
    }
  }

  @media screen and (max-width: 440px) {
    .img-container {
      height: 30rem;
      width: 100%;
    }

    .text-container {
      height: 25rem;
      width: 100%;
      padding: 0 3rem;
    }
  }
</style>
