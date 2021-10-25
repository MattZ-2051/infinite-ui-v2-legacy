<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import weAreImage from './we_are_culture.png?w=400;1000;&format=avif;webp;png&metadata=src;format;width;height';

  const videoHeight = `min(70vw, 70vh)`;
</script>

<div class="relative mt-2" style="height: {videoHeight};">
  <video class="absolute w-full h-full object-cover" playsinline loop autoplay muted>
    <source src="aria.webm" type="video/webm" />
    <source src="aria.mp4" type="video/mp4" />
  </video>
  <Image
    src={weAreImage}
    class="absolute top-0 right-0 z-10"
    style="width: calc({videoHeight} - 20px); transform: rotate(-90deg) translateY(-100%) translateX(-10px); transform-origin: top right;"
    setDimensions={true}
  />
</div>
<div class="hidden md:block text-center py-3 bg-primary-dark" style="font-size: 69px;">
  <div class="container">Exclusive Roberto Clemente NFT Collection</div>
</div>
