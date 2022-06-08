<script lang="ts">
  import { formatCurrency } from '$util/format';
  import {
    MP_MINT_TITLE,
    MP_MINT_BUTTON,
    MP_MAX_SUPPLY,
    MP_MINT_PRICE,
    MP_MAX_PER_WALLET,
    MP_PREFERRED_WALLET,
  } from '$project/variables';
  import Button from '$lib/components/Button.svelte';
  import Minus from './Minus.svelte';
  import Plus from './Plus.svelte';
  import metamaskLogo from './metamask-logo.png';

  let tokenCount = 1;
  $: total = tokenCount * MP_MINT_PRICE;
  $: userTokenCount = 0;

  function add(diff: 1 | -1) {
    tokenCount = Math.max(1, Math.min(tokenCount + diff, MP_MAX_PER_WALLET - userTokenCount));
  }
</script>

<div class="flex flex-col items-center lg:flex-row {$$props.class}">
  <div class="font-bold text-black font-lora-serif text-2xl mt-12 capitalize">
    {MP_MINT_TITLE}
  </div>
  <div class="flex flex-col items-center mt-3 lg:flex-row">
    <span class="font-normal text-black">Collection: {MP_MAX_SUPPLY}</span>
    <div class="border-l-2 border-black mr-4 ml-4 h-4 rotate-90 lg:rotate-0" />
    <span class="font-normal text-black">Max: {MP_MAX_PER_WALLET} per wallet</span>
    <div class="border-l-2 border-black mr-4 ml-4 h-4 rotate-90 lg:rotate-0" />
    <span class="font-normal text-black">
      Mint price: <strong>{MP_MINT_PRICE} ETH</strong>
    </span>
  </div>
  <div class="flex flex-col mt-6 pr-4 pl-4 lg:pr-0 lg:pl-0 lg:flex-row">
    <div class="flex mt-2 mb-6 lg:mb-0 lg:mt-0">
      <div class="flex items-center pl-6 pr-6 rounded-l-xl bg-[#F5F5F5] stepper">
        <button type="button" class="h-8 px-4" on:click={() => add(-1)}>
          <Minus />
        </button>
        <span class="text-black text-3xl font-lora-serif font-bold">{tokenCount}</span>
        <button type="button" class="h-8 px-4" on:click={() => add(1)}>
          <Plus />
        </button>
      </div>
      <div class="flex flex-col items-center justify-center lg:mr-6 pl-10 pr-10 border-l-0 rounded-r-xl stepper">
        <div class="text-black opacity-80">Total:</div>
        <div class="text-black"><strong>{formatCurrency(total, { currency: 'ETH' })}</strong></div>
      </div>
    </div>
    <Button variant="brand">
      <span class="capitalize text-white font-lora-serif font-bold text-lg">{MP_MINT_BUTTON}</span>
    </Button>
  </div>
  <div class="flex items-center mt-6 mb-12 pr-4 pl-4 lg:pr-0 lg:pl-0 lg:mb-0">
    <span class="text-black opacity-50 italic capitalize">{MP_PREFERRED_WALLET}</span>
    <img src={metamaskLogo} alt="Metamask logo" class="ml-3 h-6" />
  </div>
</div>

<style>
  .stepper {
    border: 1px solid #ebebeb;
  }
</style>
