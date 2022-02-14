<script lang="ts">
  import ourCommunityBg from './images/our-community-bg-img.svg';
  import Subscribe from './common/Subscribe.svelte';
</script>

<div class="w-full flex items-center h-screen">
  <img src={ourCommunityBg} alt="" class="absolute z-0 w-full h-screen object-cover" />
  <div class="z-10 px-12 text-white">
    <p class="text-xl font-normal pb-4" style="letter-spacing: 0.2em;">BE PART OF</p>
    <p class="text-5xl font-light tracking-widest pb-10">OUR COMMUNITY</p>
    <p class="text-base font-normal max-w-xl">
      Want to get updated when something exciting happens at McLAREN? Lorem ipsum dolor sit amet, consectetur adipiscing
      elit maecenas.
    </p>
    <div class="pt-14">
      <Subscribe />
    </div>
  </div>
</div>
