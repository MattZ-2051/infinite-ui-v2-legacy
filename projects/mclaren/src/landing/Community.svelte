<script lang="ts">
  import ourCommunityBg from './images/our-community-bg-img.svg';
  import Subscribe from './common/Subscribe.svelte';
</script>

<div class="relative community-container w-full flex justify-center">
  <img src={ourCommunityBg} alt="" class="absolute z-0 w-full h-full object-cover" />
  <div class="max-w-7xl flex justify-start items-center h-full w-full">
    <div class="z-10 px-12 text-white">
      <p class="text-xl font-normal pb-4 uppercase" style="letter-spacing: 0.2em;">be part of</p>
      <p class="text-5xl font-light tracking-widest pb-10 uppercase">our community</p>
      <p class="text-base font-normal max-w-xl">
        Want to get updated when something exciting happens at McLAREN? Lorem ipsum dolor sit amet, consectetur
        adipiscing elit maecenas.
      </p>
      <div class="pt-14">
        <Subscribe />
      </div>
    </div>
  </div>
</div>

<style>
  .community-container {
    height: 50rem;
  }
</style>
