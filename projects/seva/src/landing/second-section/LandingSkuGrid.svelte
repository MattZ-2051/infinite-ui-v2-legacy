<script>
  import Button from '$lib/components/Button.svelte';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import { skuGridLandingData } from '../utils/landingData';

  const skuGridData = skuGridLandingData();
</script>

<div class="container px-6 mb-24 lg:mb-96">
  <div class="flex flex-col justify-center w-full mt-64 mb-24">
    <div class="flex flex-col justify-center items-center">
      <div class="flex flex-col items-center max-w-4xl">
        <p class="text-4xl md:text-6xl font-medium text-center  text-black">The next drops coming up!</p>
        <p class="text-base text-black font-extralight text-center  mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam tortor, ultrices non suscipit ut!
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center mt-8 mb-48 md:mb-14">
      <form class="flex flex-col md:relative max-w-lg w-full rounded-full h-16" autocomplete="off">
        <input
          class="text-center md:text-left text-black placeholder-black placeholder-opacity-70 text-sm md:text-base md:pl-6 flex-1 font-extralight rounded-full focus:outline-none focus:ring-2 md:py-0 py-6 stroke-1"
          name="email"
          placeholder="Enter your email and don’t miss a drop!"
        />
        <div
          class="items-center flex flex-col mx-2 mt-6 md:mt-0 md:absolute md:transform md:-translate-y-1/2 md:top-1/2 md:right-0"
        >
          <Button
            --button-padding="9px 32px"
            --button-border-radius="999px"
            --button-brand-bg-color="rgba(0,0,0)"
            --button-brand-color="rgba(255,255,255)"
            --button-brand-border-color-hover="#7852FD"
            --button-brand-border-color="transparent"
            --button-brand-bg-color-hover="#7852FD"
            --button-brand-color-hover="rgba(255,255,255)"
            animate={false}
            variant="brand"
            class="whitespace-nowrap md:mr-2 w-full py-12 md:py-0 hidden md:flex"
            type="submit">Subscribe</Button
          >
          <Button
            --button-padding="16px 32px"
            --button-border-radius="999px"
            --button-brand-bg-color="rgba(0,0,0)"
            --button-brand-color="rgba(255,255,255)"
            --button-brand-border-color-hover="#7852FD"
            --button-brand-border-color="transparent"
            --button-brand-bg-color-hover="#7852FD"
            --button-brand-color-hover="rgba(255,255,255)"
            animate={false}
            variant="brand"
            class="whitespace-nowrap md:mr-2 w-full py-12 md:py-0 md:hidden flex text-xl"
            type="submit">Subscribe</Button
          >
        </div>
      </form>
      <!-- {#if $errors.email}
      <div class="text-center pt-2 text-sm text-red-600">{$errors.email}</div>
    {/if} -->
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
      {#each skuGridData as skuItem}
        <div class="border rounded-md bg-white" style="border-color: #cccccc;">
          <SkuItem sku={skuItem} />
        </div>
      {/each}
    </div>
  </div>
</div>
