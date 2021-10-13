<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { user } from '$lib/user';
  import routes from '$project/routes';
  import Button from '$lib/components/Button.svelte';
  import trust from './assets/trust.png?w=184&format=avif;webp;png&metadata=src;format;width;height';
  import carbon from './assets/carbon.png?w=135&format=avif;webp;png&metadata=src;format;width;height';
  import currency from './assets/currency.png?w=283&format=avif;webp;png&metadata=src;format;width;height';
  import deposit from './assets/deposit.png?w=173&format=avif;webp;png&metadata=src;format;width;height';
  import purchase from './assets/purchase.png?w=173&format=avif;webp;png&metadata=src;format;width;height';
  import social from './assets/social.png?w=173&format=avif;webp;png&metadata=src;format;width;height';
</script>

<div class="container py-0 flex flex-col gap-6 md:gap-12">
  <div class="flex justify-center flex-col items-center text-center gap-8 max-w-4xl mx-auto">
    <div class="text-4xl text-gradient-primary">What is The ARIA Exchange?</div>
    <div class="text-lg">
      Bringing you closer to the most collectible, coveted and rarest mix of digital content and collections in the
      world. We partner with world class artists, athletes and brands to bring you closer to what you care about most.
    </div>
    <div class="font-bold text-lg">ARIA Exchange redefines the collectible NFT experience!</div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-8 text-center text-lg">
    <div class="flex flex-col gap-8 items-center">
      <div class="h-44 flex items-center">
        <Image src={trust} />
      </div>
      <span class="text-2xl">TRUST</span>
      <span>The whole truth and nothing but the truth. You buy it. We verify it. You own it.</span>
    </div>

    <div class="flex flex-col gap-8 items-center">
      <div class="h-44 flex items-center">
        <Image src={carbon} />
      </div>
      <span class="text-2xl">CARBON NEGATIVE</span>
      <span
        >We care about our planet and we think you should too. Our transactions are the fastest in the industry and we
        redeposit 2 times the energy we use back into the environment via carbon offsets. Basically we’re making the
        world a better place.
      </span>
    </div>

    <div class="flex flex-col gap-8 items-center">
      <div class="h-44 flex items-center">
        <Image src={currency} />
      </div>
      <span class="text-2xl">CURRENCY</span>
      <span>We don't discriminate. We accept Ether, Bitcoin, Credit Cards and USDC.</span>
    </div>
  </div>
</div>

<div class="mt-8 md:mt-20 lg:mt-32 bg-primary-dark">
  <div class="container p-12 flex flex-col gap-10">
    <span class="text-2xl lg:text-4xl text-center"
      >Join our collective and let’s build our digital community together!
    </span>
    {#if !$user}
      <div class="flex justify-center">
        <Button variant="brand" href={routes.signup} --button-padding="8px 40px" sveltekit:noscroll>JOIN ARIA</Button>
      </div>
    {/if}
    <div class="intro-grid grid gap-x-1 gap-y-4">
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
      <div class="flex items-center justify-center transform rotate-90 md:transform-none text-gray-800">
        <Icon path={mdiArrowRight} size="3" />
      </div>
      <div class="flex flex-col gap-4 items-center flex-grow">
        <div class="h-36 flex items-center">
          <Image src={purchase} />
        </div>
        <div class="flex flex-col text-center ">
          <span>Purchase or</span>
          <span>place a bid</span>
        </div>
      </div>
      <div class="flex items-center justify-center transform rotate-90 md:transform-none text-gray-800">
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
</div>

<style lang="postcss">
  .intro-grid {
    font-size: 27px;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @screen md {
    .intro-grid {
      grid-template-columns: 1fr 72px 1fr 72px 1fr;
    }
  }
</style>
