<script lang="ts">
  import curvedBorder from './images/curved-border.svg';
  import mclarenClassicCard from './images/mclaren-classic-collection-img.svg';
  import mclarenSuperCarCard from './images/mclaren-super-cars-collection-img.svg';
</script>

<div class="h-full w-full flex flex-col items-center relative">
  <img src={curvedBorder} alt="" class="absolute top-0 w-full" />
  <div class="text-black pb-16 pt-8">
    <p class="font-normal tracking-widest text-5xl pb-4 text-center w-full pt-24 uppercase">featured collections</p>
    <p class="text-justify text-base font-light sub-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la.
    </p>
  </div>
  <div class="w-full grid grid-cols-2 gap-x-12">
    <div class="justify-self-end flex w-10/12 text-white z-0 relative img-container">
      <img src={mclarenClassicCard} alt="" class="absolute -z-1 -top-0 w-full img-shadow rounded-3xl" />
      <div class="px-12 pt-24 flex items-center">
        <div>
          <p class="tracking-wider text-xl font-normal pb-2">McLAREN CLASSICS 1ST</p>
          <p class="text-5xl font-light pb-5 uppercase">collection</p>
          <p class="text-base font-light max-w-xl">
            Nam a tellus mollis nisi laoreet rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In at
            purus ut orci aliquam egestas at id arcu. Nam a tellus mollis nisi laoreet rutrum.
          </p>
        </div>
      </div>
    </div>
    <div class="justify-self-start flex w-10/12 text-white z-0 relative img-container">
      <img src={mclarenSuperCarCard} alt="" class="absolute -z-1 top-0 w-full img-shadow rounded-3xl" />
      <div class="px-12 pt-24 flex items-center">
        <div>
          <p class="tracking-wider text-xl font-normal pb-2">McLAREN CLASSICS 1ST</p>
          <p class="text-5xl font-light pb-5 uppercase">collection</p>
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
  .sub-text:after {
    content: '';
    display: inline-block;
    width: 100%;
  }
  .img-container {
    height: 45rem;
  }

  .img-shadow {
    box-shadow: 0px 40px 50px rgb(0 0 0 / 50%);
  }
</style>
