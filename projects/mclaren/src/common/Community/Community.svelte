<script lang="ts">
  import MarketoEmbeddedForm from '$project/common/MarketoEmbeddedForm.svelte';
  import Image from '$ui/image/Image.svelte';
  import communityImg from '$project/assets/aws/landing/MCL014_McLaren_Family_Static_no_text_1800x3360.jpeg?w=800;1600&format=avif;webp;jpg&metadata=src;format;width;height';
</script>

<div class="relative community-container w-full flex justify-center">
  <Image src={communityImg} class="absolute z-0 w-full h-full object-cover" />
  <div class="max-w-7xl flex justify-start items-center h-full w-full container">
    <div class="z-10 sm:px-12 text-white">
      <p class="text-base sm:text-lg font-light pb-1 uppercase second-font" style="letter-spacing: 0.2em;">JOIN THE</p>
      <p class="text-3xl sm:text-5xl font-light tracking-widest pb-6 second-font">McLAREN FAMILY</p>
      <p class="text-sm sm:text-lg font-light max-w-xl">
        Sign up for exclusive access to the latest McLaren products, news and inspiration.
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
