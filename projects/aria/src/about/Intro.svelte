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

<section class="container py-0 flex flex-col gap-6 md:gap-12">
  <div class="flex justify-center flex-col items-center text-center gap-8 max-w-4xl mx-auto">
    <h2 class="text-4xl text-gradient-primary">What is The ARIA Exchange?</h2>
    <p class="text-lg">
      We’re a creative marketplace that partners with the world’s most iconic artists, athletes and brands to bring you
      the rarest mix of collectibles in the world. Our community platform allows you to discover, buy, and sell highly
      covetable crypto collectibles, with ease.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-8 text-center text-lg">
    <div class="flex flex-col gap-8 items-center">
      <div class="h-44 flex items-center">
        <Image src={trust} />
      </div>
      <span class="text-2xl">TRUST</span>
      <div class="space-y-4 max-w-sm">
        <p>Your privacy is our priority.</p>
        <p>
          We’ve created a marketplace that is 100% safe and secure so you can buy and sell your collectibles with peace
          of mind. All sellers and transactions are verified.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-8 items-center">
      <div class="h-44 flex items-center">
        <Image src={carbon} />
      </div>
      <span class="text-2xl">CARBON NEGATIVE</span>
      <div class="space-y-4 max-w-sm">
        <p>The only thing we love more than collectibles is our planet.</p>
        <p>
          With the goal to be the most environmentally responsible NFT marketplace on Earth, we redeposit 2X the energy
          we consume via carbon offsets.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-8 items-center">
      <div class="h-44 flex items-center">
        <Image src={currency} />
      </div>
      <span class="text-2xl">CURRENCY</span>
      <div class="space-y-4 max-w-sm">
        <p>Your money is good here.</p>
        <p>We accept a wide range of payment options, including Ether, Bitcoin, Credit Cards and USDC.</p>
      </div>
    </div>
  </div>
</section>

<section class="mt-8 md:mt-20 lg:mt-32 bg-primary-dark">
  <div class="container p-12 flex flex-col gap-10">
    <h2 class="text-2xl lg:text-4xl text-center">
      Stay ahead of all the hottest trends. Join our growing community of buyers and sellers, and start curating your
      collectibles today.
    </h2>
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
          <p>Create your ARIA account & fund your wallet with a currency of your choosing.</p>
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
          <p>Purchase or place bids on your favorite collectibles.</p>
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
          <p>Share what you’re loving on social & tag us @TheARIAexchange</p>
        </div>
      </div>
    </div>
  </div>
</section>

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
