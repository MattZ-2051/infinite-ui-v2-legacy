<script lang="ts">
  import type { IconSource } from './types';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import visa from './assets/visa-icon.svg';
  import mastercard from './assets/mastercard-icon.svg';
  import amex from './assets/amex-icon.svg';
  import applePay from './assets/applepay-icon.svg';
  import gPay from './assets/gpay-icon.svg';

  export let title: string;
  export let id: string;
  export let iconSource: IconSource;
  export let classNames = '';
  export let onClick: () => void;
</script>

<Button on:click={() => onClick()} variant="brand" class={`flex flex-col xl:w-80 xl:h-80 w-72 h-72 ${classNames}`}>
  <div class="flex flex-col justify-evenly items-center absolute">
    <Icon class="pb-6" path={iconSource} viewBox="0 0 72 73" size={4.5} />
    <span class="xl:text-2xl text-xl font-normal tracking-tight">{title}</span>
  </div>
  {#if id.includes('cc')}
    <div class="flex flex-row gap-x-2 relative xl:-bottom-32 -bottom-28">
      <img src={visa} alt="visa" />
      <img src={mastercard} alt="mastercard" />
      <img src={amex} alt="amex" />
      <img src={applePay} alt="applePay" />
      <img src={gPay} alt="gpay" />
    </div>
  {/if}
</Button>
