<script language="ts">
  import { management, advisors } from './Info';
  import TeamGrid from './TeamGrid.svelte';
  import drops from './assets/drops.png';
  import yellowDropsMobile from './assets/yellowDropsMobile.svg';
  import explosion from './assets/explosion.svg';
  import explosionMobile from './assets/explosionMobile.svg';
  import purpleDropsMobile from './assets/purpleDropsMobile.svg';
  import purpleDrops from '../exchangingGoodness/assets/drops.png';
</script>

<div class="container mt-20 mb-24 lg:mb-0 px-6">
  <div class="flex flex-col items-center">
    <div class="font-medium text-4xl sm:text-6xl text-center mb-9 max-w-4xl">The Seva.Love team</div>
    <div class="text-center max-w-3xl font-medium">Like minded souls united in Love</div>
  </div>

  <div class=" w-full h-0 flex justify-end">
    <img src={explosion} alt="star" class="relative h-28 lg:-top-20 hidden lg:block" />
  </div>
</div>

<div class="container">
  <div class=" w-full h-0 flex justify-end">
    <img src={explosionMobile} alt="star" class="relative h-28  lg:hidden left-4" />
  </div>
  <TeamGrid people={management} title="Management" />
  <div class="w-full h-0 flex justify-end">
    <img src={purpleDrops} alt="purple drops" class="relative h-24 lg:top-28 hidden 2xl:block 2xl:left-4  " />
  </div>
</div>
<div class="container">
  <div class="w-full h-0 flex justify-start">
    <img src={drops} alt="yellow drops" class="relative h-16 lg:-top-80 hidden 2xl:block 2xl:-left-8" />
    <img
      src={yellowDropsMobile}
      alt="yellow drops"
      class="relative h-12 sm:h-16 2xl:hidden 2xl:-left-8 right-4 top-12 sm:top-8"
    />
  </div>
  <TeamGrid people={advisors} title="Advisors" />
  <div class="w-full h-0 flex justify-end pb-24 2xl:hidden">
    <img src={purpleDropsMobile} alt="purple drops" class="relative h-24 -top-4 left-4  " />
  </div>
</div>
