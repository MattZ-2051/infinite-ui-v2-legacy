<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import weAreDisruption from '$static/we_are_disruption.png?w=400;1000;&format=avif;webp;png&metadata';

  let videoElement: HTMLVideoElement;
</script>

<div class="relative" style="height: min(60vw, 60vh);">
  <video
    bind:this={videoElement}
    on:timeupdate={() => {
      if (videoElement.currentTime > videoElement.duration - 1) {
        videoElement.pause();
      }
    }}
    src="/aria_preview.mp4"
    class="absolute w-full h-full object-cover"
    playsinline
    autoplay
    muted
  />
  <Image
    src={weAreDisruption}
    class="absolute top-0 right-0 z-10"
    style="width: min(90vw, 90vh); transform: rotate(-90deg) translateY(-100%); transform-origin: top right;"
    setDimensions={true}
  />
</div>
