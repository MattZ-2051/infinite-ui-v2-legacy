<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import eye from './assets/eye.png?w=87&format=avif;webp;png&metadata';
  import flame from './assets/flame.png?w=87&format=avif;webp;png&metadata';
  import dollar from './assets/dollar.png?w=87&format=avif;webp;png&metadata';
  import deposit from './assets/deposit.png?w=173&format=avif;webp;png&metadata';
  import purchase from './assets/purchase.png?w=173&format=avif;webp;png&metadata';
  import social from './assets/social.png?w=173&format=avif;webp;png&metadata';
</script>

<div class="flex justify-center flex-col items-center text-center gap-8">
  <div class="text-4xl mt-8">What is The ARIA Exchange?</div>
  <div class="text-lg">
    In partnership with the biggest artists, musicians, athletes and celebs, ARIA Exchange delivers dynamic, next-level
    collectibles! ARIA Exchange is the most innovative and transparent NFT Exchange.
  </div>
  <div class="font-bold text-lg">ARIA Exchange redefines the collectible NFT experience!</div>
</div>

<div class="flex flex-col gap-8  md:grid md:grid-cols-3 text-center text-lg">
  <div class="flex flex-col gap-8 items-center">
    <Image src={eye} />
    <span class="text-2xl">TRUST</span>
    <span>The whole truth and nothing but the truth. You buy it. We trace it. You own it.</span>
  </div>

  <div class="flex flex-col gap-8 items-center">
    <Image src={flame} />
    <span class="text-2xl">CARBON NEGATIVE</span>
    <span
      >10,000 transactions per second as compared to Ethereum’s 12 transactions per second. This blistering speed
      enables ARIA Exchange to use a fraction of the energy used by other NFT marketplaces. We then redeposit 2x the
      energy used back into the environment via carbon offsets.
    </span>
  </div>

  <div class="flex flex-col gap-8 items-center">
    <Image src={dollar} />
    <span class="text-2xl">CURRENCY</span>
    <span>We don’t discriminate. We accept all money including Ether, Bitcoin, Credit Cards and USDC. </span>
  </div>
</div>

<div class="flex flex-col gap-10 ">
  <span class="text-4xl text-center">Join our community and start collecting today! </span>
  <button class="bg-yellow-300 rounded-full py-2 px-8 text-lg self-center">JOIN ARIA</button>
  <div class="flex flex-col  md:flex-row gap-8" style="font-size:27px;">
    <div class="flex flex-col gap-4 items-center flex-grow">
      <div class="h-36 flex items-center">
        <Image src={deposit} />
      </div>
      <div class="flex flex-col text-center ">
        <span>Open ARIA account </span>
        <span>+</span>
        <span>Make deposit</span>
      </div>
    </div>
    <div class="flex items-center justify-center transform rotate-90 md:transform-none">
      <Icon path={mdiArrowRight} size="3" />
    </div>
    <div class="flex flex-col gap-4 items-center flex-grow">
      <div class="h-36 flex items-center">
        <Image src={purchase} />
      </div>
      <div class="flex flex-col text-center ">
        <span>Purchase or</span>
        <span>bid</span>
      </div>
    </div>
    <div class="flex items-center justify-center transform rotate-90 md:transform-none">
      <Icon path={mdiArrowRight} size="3" />
    </div>
    <div class="flex flex-col gap-4 items-center flex-grow">
      <div class="h-36 flex items-center">
        <Image src={social} />
      </div>
      <div class="flex flex-col text-center ">
        <span>Share on</span>
        <span>social</span>
      </div>
    </div>
  </div>
</div>
