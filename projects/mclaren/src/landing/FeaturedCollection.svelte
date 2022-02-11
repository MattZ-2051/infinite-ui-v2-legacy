<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import featuredImg from './images/featured-collection-img.svg';
</script>

<div class="h-screen w-full relative">
  <div class="h-2/3 bg-black w-full absolute top-0" />
  <div class="h-full w-full text-white flex justify-center items-center">
    <div class="z-10 text-center">
      <p class="text-xl font-light pb-2 uppercase" style="letter-spacing: 0.2em;">featured collection</p>
      <p class="text-5xl font-light pb-8 tracking-widest">McLAREN F1 CLASSICS</p>
      <p class="text-base font-light max-w-4xl leading-7">
        Nam a tellus mollis nisi laoreet rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In at
        purus ut orci aliquam egestas at id arcu. Curabitur iaculis orci enim, auctor tempus lorem mattis non. Morbi
        eget mauris et augue hendrerit venenatis. Proin mi dolor, consequat quis vehicula nec, malesuada ut lorem.
      </p>
      <Button variant="brand" class="w-56 h-16 text-xs tracking-widest font-bold mt-10 uppercase">explore now</Button>
    </div>
  </div>
  <img src={featuredImg} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full" alt="" />
</div>
