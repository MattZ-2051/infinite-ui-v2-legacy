<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';
  import Image from '$ui/image/Image.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { user, onSignUp } from '$lib/user';
  import Button from '$lib/components/Button.svelte';
  import deposit from './assets/deposit.png?w=173&format=avif;webp;png&metadata=src;format;width;height';
  import purchase from './assets/purchase.png?w=173&format=avif;webp;png&metadata=src;format;width;height';
  import social from './assets/social.png?w=173&format=avif;webp;png&metadata=src;format;width;height';
</script>

<section class="container mt-10 py-0 flex flex-col gap-6 md:gap-12">
  <div class="flex justify-center flex-col items-center text-center gap-8 max-w-4xl mx-auto">
    <h2 class="text-4xl text-gradient-primary section-title">What is ARIA Exchange?</h2>
    <p class="text-lg">
      We are a creative marketplace that partners with the world’s most iconic artists, athletes and brands to bring you
      the rarest mix of collectibles in the world. Our community platform allows you to discover, buy, and sell highly
      covetable crypto collectibles, with ease.
    </p>
  </div>
</section>

<section class="mt-20 bg-primary-dark">
  <div class="container p-12 flex flex-col gap-10">
    <h2 class="text-2xl lg:text-4xl text-center">
      Stay ahead of all the hottest trends. Join our growing community of buyers and sellers, and start curating your
      collectibles today.
    </h2>
    {#if !$user}
      <div class="flex justify-center">
        <Button variant="brand" on:click={onSignUp} --button-padding="8px 40px" sveltekit:noscroll>JOIN ARIA</Button>
      </div>
    {/if}
    <div class="intro-grid grid gap-x-1 gap-y-4">
      <div class="flex flex-col gap-4 items-center flex-grow">
        <div class="h-36 flex items-center">
          <Image src={deposit} />
        </div>
        <div class="flex flex-col text-center ">
          <p>Create your ARIA Exchange account & fund your wallet.</p>
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
          <p>Share what you’re loving on social & tag us @TheARIAExchange</p>
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
