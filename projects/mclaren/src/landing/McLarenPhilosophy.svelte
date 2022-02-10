<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import Button from '$lib/components/Button.svelte';
  import philosophyImg from './images/philosophy-bg.png?w=1680&format=avif;webp;png&metadata=src;format;width;height';
</script>

<div class="relative">
  <div class="flex justify-center items-center h-screen">
    <div class="text-white w-full z-10 flex-col max-w-7xl items-center justify-center">
      <p class="text-xl font-normal pb-2" style="letter-spacing:0.2em;">NFT, IT'S AS EASY AS 1-2-3</p>
      <p class="tracking-widest text-5xl font-light pb-8">McLAREN PHILOSOPHY</p>
      <p class="text-xl font-light max-w-lg pb-6 leading-9">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
        sollicitudin sed. Nunc sed purus et nunc sollicitudin.
      </p>
      <p class="text-xl font-light max-w-lg leading-9 pb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
        sollicitudin sed. Nunc sed purus et nunc sollicitudin.
      </p>
      <Button variant="brand" class="h-16 w-80 font-bold text-xs tracking-widest">DISCOVER OUR PHILOSOPHY</Button>
    </div>
  </div>
  <Image src={philosophyImg} class="w-full absolute object-cover top-0 -z-1" />
</div>
