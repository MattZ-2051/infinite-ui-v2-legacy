<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import heroImg from './images/bg-hero-img.svg';
  import bgGradient from './images/bg-gradient-bottom-img.svg';
</script>

<img src={heroImg} alt="" class="w-full z-0 absolute h-screen object-cover" />
<img src={bgGradient} alt="" class="w-full z-30 absolute h-screen object-cover" />
<div class="flex justify-center">
  <div class="flex items-center relative h-screen w-full max-w-7xl px-6 lg:px-0">
    <div class="text-white w-1/2 max-w-3xl z-∞">
      <p class="text-2xl font-light pb-2 uppercase">defy the limits on the</p>
      <p class="text-7xl font-light pb-6 uppercase">metaverse</p>
      <p class="text-xl font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
        sollicitudin sed. Nunc sed purus et nunc sollicitudin.
      </p>
      <Button variant="brand" class="text-xs w-64 h-16 mt-12 font-semibold tracking-widest uppercase"
        >explore the drop</Button
      >
    </div>
  </div>
</div>
