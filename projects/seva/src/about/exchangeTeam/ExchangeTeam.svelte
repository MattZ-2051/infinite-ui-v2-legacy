<script language="ts">
  import { management, advisors } from './Info';
  import TeamGrid from './TeamGrid.svelte';
  import drops from './assets/drops.png';
  import explosion from './assets/explosion.svg';
  import purpleDrops from '../exchangingGoodness/assets/drops.png';
</script>

<div>
  <div class="container mt-10 mb-24 lg:mb-0 px-6">
    <div class="flex flex-col items-center">
      <div class="font-medium text-4xl sm:text-6xl text-center mb-9 max-w-4xl">The Seva.Love team</div>
      <div class="text-center max-w-3xl font-medium">Like minded souls united in Love</div>
    </div>

    <div class=" w-full h-0 flex justify-end">
      <img src={explosion} alt="star" class="relative h-28 lg:-top-20 hidden lg:block" />
    </div>
  </div>

  <div class="container">
    <TeamGrid people={management} title="Management" />
    <!-- <div style="max-width:var(--container-max-width); padding-left=calc(var(--container-max-width/" -->
    <div class="w-full h-0 flex justify-end">
      <img src={purpleDrops} alt="star" class="relative h-24 lg:top-28 hidden 2xl:block 2xl:left-4  " />
    </div>
  </div>
  <div class="container">
    <div class="w-full h-0 flex justify-start">
      <img src={drops} alt="star" class="relative h-16 lg:-top-80 hidden 2xl:block 2xl:-left-8" />
    </div>
    <TeamGrid people={advisors} title="Advisor" />
  </div>
</div>
