<script>
  import YellowBg from './assets/YellowBg.png';
  import YellowMobile from './assets/yellowMobile.png';
  import drops from './assets/drops.png';
</script>

<div class="md:pb-48">
  <div style="width:100%; height:0px">
    <img src={YellowBg} alt="bg" class="hidden xl:block w-full relative z-1" style="height:40em" />
    <img src={YellowMobile} alt="bg" class="xl:hidden w-full relative z-1" style="height:40em" />
  </div>
  <div class="container py-20 md:py-36 flex flex-col items-center relative z-10 px-6">
    <div class="font-medium text-4xl md:text-6xl mb-8 md:mb-4 max-w-3xl text-center">
      Exchanging goodness one drop at a time.
    </div>
    <div class="text-center font-medium text-xl md:text-2xl mb-6 max-w-4xl">
      <div class="font-semibold mt-4">The world's first NFT Goodness Exchange.</div>
      Here to create a one of a kind experience for the world’s top achievers to make a difference to the world by creating
      their unique NFT drops.
    </div>
    <div class="text-center w-full flex flex-col-reverse items-center lg:flex-row justify-center">
      <div class="hidden lg:block h-0 w-0 relative">
        <img src={drops} alt="drops" class="relative" style="min-width:100px; left:-15vw; " />
      </div>
      <div class="lg:hidden w-full flex justify-center" style="margin-top:10vh">
        <img src={drops} alt="drops" style="max-width:20%" />
      </div>
      <div style=" " class="flex justify-center sm:max-w-xl">
        Once we create them, we auction these NFT’s on SEVA.LOVE, the proceeds of which go to the achiever’s
        organisation to do good in the world.
      </div>
    </div>
  </div>
</div>
