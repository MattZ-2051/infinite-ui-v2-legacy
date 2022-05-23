<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import { lazyLoadVideoSource } from '$util/lazyLoad';
  import Divider from './common/Divider.svelte';

  let videoElement: HTMLVideoElement;
</script>

<div class="w-full h-full relative">
  <div class="h-72 relative w-full mt-32 sm:mt-72">
    <Divider class="max-w-full absolute bottom-0" />
    <div class="h-full flex flex-col items-center justify-end container pb-14">
      <p class="font-light second-font text-3xl sm:text-5xl text-white text-center uppercase tracking-widest">
        Coming Soon
      </p>
    </div>
  </div>
  <div class="pb-24 sm:pb-64 bg-black">
    <IntersectionObserver
      element={videoElement}
      once
      rootMargin={'250px'}
      on:intersect={() => lazyLoadVideoSource(videoElement)}
    >
      <video
        bind:this={videoElement}
        class="w-full object-cover h-full md:h-[40rem] md:container md:max-w-5xl"
        autoplay
        loop
        muted
        playsinline
      >
        <source data-src="/videos/FINAL_Collections001digital_dynamics_s.mp4" type="video/mp4" />
      </video>
    </IntersectionObserver>
  </div>
</div>
