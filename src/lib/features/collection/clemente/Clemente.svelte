<script lang="ts">
  import { mdiBellOutline as notifyIcon, mdiShareVariant as shareIcon } from '@mdi/js';
  import Image from '$ui/image/Image.svelte';
  import { notifyAction } from '$lib/notify';
  import { socialShareAction } from '$lib/social';
  import IconVerified from '$lib/components/talent/IconVerified.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import clementeHeader from './clement-header.png?w=626&format=avif;webp;png&metadata';
  import signature from './signature.png?w=344&format=avif;webp;png&metadata';
  import tagline from './tagline.png';
  import clemente from './Clemente.png';
  import clementeVideo from './clamente_1.mp4';
  import clemente21 from './clemente-21.png?w=640&format=avif;webp;png&metadata';

  export let profile;
</script>

<div class="flex flex-col gap-14">
  <div class="flex flex-col gap-4 justify-center items-center">
    <div
      class="h-24 w-24 md:h-36 md:w-36 rounded-full bg-contain bg-center"
      style="background-image: url({clemente})"
    />
    <div class="flex gap-2 items-center">
      <span class="text-4xl md:text-5xl text-center">Roberto Clemente</span>
      <IconVerified size={32} />
    </div>
    <div class="text-2xl">@ClementeMuseum</div>
    <div class="relative">
      <div class="grid grid-cols-2  border border-opacity-20 rounded-md overflow-hidden">
        <div class="border-r border-opacity-20">
          <button
            type="button"
            class="flex items-center justify-center gap-2 hover:bg-primary text-center py-3 px-5 w-full h-full"
            use:notifyAction={{ profile }}><Icon path={notifyIcon} />Notify Me</button
          >
        </div>
        <div class="border-r border-opacity-20">
          <button
            type="button"
            class="flex items-center justify-center gap-2 hover:bg-primary text-center py-3 px-5 w-full h-full"
            use:socialShareAction><Icon path={shareIcon} />Share</button
          >
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col justify-evenly md:grid md:grid-cols-2">
    <div class="flex md:justify-end mt-8 flex-shrink">
      <div class="flex flex-col gap-5">
        <h1 class="text-4xl md:text-6xl text-yellow-200 font-medium text-center md:text-left">
          Exclusive Drop July 15th
        </h1>
        <div class="relative text-white text-3xl font-medium">
          <span
            >"Any time you have an opportunity to make a difference in this world and you don't, then you are wasting
            your time on Earth."</span
          >
          <Image src={signature} alt="signature" class="float-right" />
        </div>

        <div class="text-white-opacity-60 text-xl">
          "Roberto Clemente played the game of baseball with great passion. That passion could only be matched by his
          unrelenting commitment to make a difference in the lives of the less fortunate and those in need. People saw
          Roberto as a great ballplayer and humanitarian. He was also a great father, husband, teammate and friend." -
          Manny Sanguillen
        </div>
      </div>
    </div>
    <div class="flex relative">
      <Image src={clementeHeader} alt="Clement header" />
    </div>
  </div>

  <video src={clementeVideo} playsinline autoplay loop muted style="object-fit: cover; margin:auto;" poster={tagline} />
</div>
<slot />
<Image src={clemente21} alt="Clemente's shirt" class="m-auto" />
