<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import philosophyImg from './images/philosophy-bg-img.svg';
</script>

<div class="relative">
  <div class="flex justify-center items-center h-screen">
    <div class="text-white w-full z-10 flex-col max-w-7xl items-center justify-center container">
      <p class="text-base sm:text-xl font-normal pb-2 uppercase second-font" style="letter-spacing:0.2em;">
        nft, it's as easy as 1-2-3
      </p>
      <p class="tracking-widest sm:text-5xl text-3xl font-light pb-8 second-font leading-10 sm:leading-normal">
        McLAREN PHILOSOPHY
      </p>
      <div class="text-base sm:text-lg font-light max-w-lg leading-9">
        <p class="pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
          sollicitudin sed. Nunc sed purus et nunc sollicitudin.
        </p>
        <p class="pb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
          sollicitudin sed. Nunc sed purus et nunc sollicitudin.
        </p>
      </div>
      <Button variant="brand" class="h-12 sm:h-16 w-full sm:w-80 font-bold text-xs tracking-widest uppercase"
        >discover our philosophy</Button
      >
    </div>
  </div>
  <img alt="" src={philosophyImg} class="w-full absolute object-cover top-0 -z-1 h-full" />
</div>
