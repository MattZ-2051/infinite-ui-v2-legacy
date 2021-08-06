<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import clementeHeader from './clement-header.png?w=626&format=avif;webp;png&metadata';
  import signature from './signature.png?w=344&format=avif;webp;png&metadata';
  import tagline from './tagline.png';
  import flag from './flag.svg';
  import clemente from './Clemente.png';
  import clementeVideo from './clamente_1.mp4';
</script>

<div class="flex flex-col gap-14 mb-12">
  <video src={clementeVideo} playsinline autoplay loop muted style="object-fit: cover; margin:auto;" poster={tagline} />
  <div class="flex flex-col justify-evenly md:grid md:grid-cols-2">
    <div class="flex relative">
      <Image src={clementeHeader} alt="Clement header" />
      <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 flex flex-col items-center  gap-2 font-light">
        <div
          class="h-24 w-24 md:h-36 md:w-36 rounded-full bg-contain bg-center"
          style="background-image: url({clemente})"
        />
        <div class="text-gray-400 text-2xl">@ClementeMuseum</div>
        <img src={flag} class="w-10 h-6" alt="flag" />
      </div>
    </div>
    <div class="flex md:justify-end mt-8 flex-shrink">
      <div class="flex flex-col gap-5">
        <h1 class="text-4xl text-yellow-200 font-light">Exclusive Drop July 15th</h1>
        <div class="relative text-white text-3xl font-light">
          <span
            >"Any time you have an opportunity to make a difference in this world and you don't, then you are wasting
            your time on Earth."</span
          >
          <Image src={signature} alt="signature" class="float-right" />
        </div>

        <div class="text-gray-400 text-xl">
          "Roberto Clemente played the game of baseball with great passion. That passion could only be matched by his
          unrelenting commitment to make a difference in the lives of the less fortunate and those in need. People saw
          Roberto as a great ballplayer and humanitarian. He was also a great father, husband, teammate and friend." -
          Manny Sanguillen
        </div>
      </div>
    </div>
  </div>
</div>
