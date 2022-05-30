<script>
  import YellowBgLg from './assets/YellowBg1.png';
  import YellowBgMd from './assets/YellowBg.svg';
  import YellowMobile from './assets/yellowMobile.png';
  import drops from './assets/drops.png';
</script>

<div class="sm:pb-24">
  <div style="width:100%; height:0px">
    <img src={YellowBgLg} alt="bg" class="hidden 2xl:block w-full relative z-1" style="height:40em" />
    <img src={YellowBgMd} alt="bg" class="hidden xl:block 2xl:hidden w-full relative z-1" style="height:40em" />
    <img src={YellowMobile} alt="bg" class="xl:hidden w-full relative z-1" style="height:40em" />
  </div>
  <div class="container py-20 md:py-36 flex flex-col items-center relative z-10 px-6">
    <div class="font-medium text-4xl md:text-6xl mb-8 md:mb-4 max-w-3xl text-center">
      Catalyzing Change One NFT At a Time
    </div>
    <div class="text-center font-medium text-xl md:text-2xl mb-6 max-w-4xl">
      <!-- <div class="font-semibold mt-4">The world's first NFT Goodness Exchange.</div> -->
      The Seva.Love platform aims to empower communities focused on social and environmental impact through exclusive carbon
      negative Hedera NFT releases.
    </div>
    <div class="text-center w-full flex flex-col-reverse items-center lg:flex-row justify-center">
      <div class="hidden lg:block h-0 w-0 relative">
        <img src={drops} alt="drops" class="relative" style="min-width:100px; left:-15vw; " />
      </div>
      <div class="lg:hidden w-full flex justify-center" style="margin-top:10vh">
        <img src={drops} alt="drops" style="max-width:20%" />
      </div>
      <div style=" " class="flex justify-center sm:max-w-xl">
        With the proceeds from each NFT targeted towards the non-profit of their choice, we aim to enable global action
        to impact tangible changes that benefit our society for generations to come.
      </div>
    </div>
  </div>
</div>
