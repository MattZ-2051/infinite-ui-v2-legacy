<script lang="ts">
  import CreditCardExtraInfo from './CreditCardExtraInfo.svelte';
  import MetamaskExtraInfo from './MetamaskExtraInfo.svelte';

  export let title: string;
  export let id: string;
  export let iconSource: string;
  export let classNames = '';
  export let onClick: () => void;
</script>

<button
  on:click={() => onClick()}
  class={`flex items-center py-5 px-8 h-72 min-h-[88px] max-w-[110%] w-full xl:w-[40vw] h-[88px] lg:h-[10vh] border-[1px] rounded-lg justify-between ${classNames}`}
>
  <div class="w-full flex items-center">
    <div class="icon-container h-12 w-12 rounded-full bg-gray-50 mr-4 flex justify-center items-center">
      <img src={iconSource} alt={title} class="w-7 h-7" />
    </div>

    <div class="flex flex-col md:flex-row justify-between grow ">
      <span class="text-default text-lg text-left font-normal tracking-tight">{title}</span>
      {#if id.includes('cc')}<CreditCardExtraInfo />{/if}
      {#if id.includes('mm')}<MetamaskExtraInfo />{/if}
    </div>
  </div>
</button>

<style>
  button {
    border-color: var(--button-payment-method-active-color, rgb(243 244 246)); /* tailwind bg-gray-100 */
  }

  button:hover {
    background-color: var(--button-payment-method-active-color, rgb(243 244 246)); /* tailwind bg-gray-100 */
  }

  button:hover .icon-container {
    background-color: var(--bg-color);
  }
</style>
