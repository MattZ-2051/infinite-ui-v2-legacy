<script lang="ts">
  import Mint from '$project/mint/Mint.svelte';
</script>

<div class="container flex flex-col lg:pl-24 pt-24 pb-60 gap-24">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
    <div class="flex flex-col">
      <div class="text-primary font-baton font-bold text-4xl">EARN WITH PURPOSE</div>
      <div class="font-baton font-bold flex flex-col mt-5 leading-none" style="font-size: clamp(6rem, 10vw, 9rem)">
        <span>MADIBA</span>
        <span>GENESIS</span>
        <span>VOL I</span>
      </div>
      <div class="text-xl flex flex-col gap-12 mt-12 max-w-xl">
        <p>
          THE MADIBA GENESIS COLLECTION IS A MUST OWN VOLUME AS IT UNLOCKS AIRDROPS AND REWARDS AS WE CONTINUE TO
          RELEASE VOLUMES IN OUR NFT PACK.
        </p>
        <p>
          THIS TOKEN ALSO <span class="text-primary">ACTS AS A MINT PASS FOR THE MADIBA GENESIS 100</span> WHICH IS YOUR
          EXCLUSIVE ENTRY TICKET INTO THE IMMERSIVE MANDELAVERSE GALA HELD ON JULY 18TH, 2022, BETTER KNOWN AS MANDELA DAY.
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <video autoplay loop muted playsinline>
        <source
          src="https://mandelaverse.io/wp-content/themes/mandelaverse/assets/videos/collection-bronze.mp4"
          type="video/mp4"
        />
      </video>
      <div class="flex gap-8 justify-end text-xs mr-20 text-right">
        <div>MANDIBA GENESIS<br />COLLECTION</div>
        <div>MINTING STARTS<br />MAY 3, 2022</div>
      </div>
    </div>
  </div>
  <div class="lg:mr-24 py-12 lg:py-24 flex justify-center" style="background-color: #171717;">
    <Mint />
  </div>
</div>
