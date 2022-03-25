<script lang="ts">
  import MarketoEmbeddedForm from '$project/common/MarketoEmbeddedForm.svelte';
  import ourCommunityBg from './images/our-community-bg-img.svg';
</script>

<div class="relative community-container w-full flex justify-center">
  <img src={ourCommunityBg} alt="" class="absolute z-0 w-full h-full object-cover" />
  <div class="max-w-7xl flex justify-start items-center h-full w-full container">
    <div class="z-10 sm:px-12 text-white">
      <p class="text-base sm:text-lg font-normal pb-4 uppercase second-font" style="letter-spacing: 0.2em;">
        be part of
      </p>
      <p class="text-3xl sm:text-5xl font-light tracking-widest pb-10 uppercase second-font">our community</p>
      <p class="text-sm sm:text-lg font-normal max-w-xl">
        Want to get updated when something exciting happens at McLAREN? Lorem ipsum dolor sit amet, consectetur
        adipiscing elit maecenas.
      </p>
      <div class="pt-14">
        <MarketoEmbeddedForm />
      </div>
    </div>
  </div>
</div>

<style>
  .community-container {
    height: 50rem;
  }
</style>
