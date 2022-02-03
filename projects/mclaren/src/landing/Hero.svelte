<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import Button from '$lib/components/Button.svelte';
  import heroImg from './images/bg-hero.png?format=avif;webp;png&metadata=src;format;width;height';
  import bgGradient from './images/bg-gradient.png?format=avif;webp;png&metadata=src;format;width;height';
</script>

<Image src={heroImg} class="w-full z-0 absolute h-screen object-cover" />
<Image src={bgGradient} class="w-full z-30 absolute h-screen object-cover" />
<div class="flex justify-center">
  <div class="flex items-center relative h-screen px-12 w-full">
    <div class="text-white w-1/2 max-w-3xl z-∞">
      <p class="text-2xl font-light pb-2">DEFY THE LIMITS ON THE</p>
      <p class="text-7xl font-light pb-6">METAVERSE</p>
      <p class="text-xl font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
        sollicitudin sed. Nunc sed purus et nunc sollicitudin.
      </p>
      <Button variant="brand" class="text-xs w-64 h-16 mt-12 font-semibold tracking-widest">EXPLORE THE DROP</Button>
    </div>
  </div>
</div>
