<script lang="ts">
  import { variables } from '$lib/variables';
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
  class={`${variables.persona.tenantName.toLowerCase()} payment-btn  h-72 min-h-[88px] max-w-[110%] w-full xl:w-[40vw] h-[88px] lg:h-[10vh] border-[1px] rounded-lg justify-between ${classNames}`}
>
  <div class="w-full h-full flex items-center py-5 px-8">
    <div class="w-full flex items-center">
      <div class="icon-container h-12 w-12 rounded-full mr-4 flex justify-center items-center">
        <img src={iconSource} alt={title} class="w-7 h-7" />
      </div>

      <div class="flex flex-col md:flex-row justify-between grow ">
        <span class="title text-default text-lg text-left font-normal tracking-tight">{title}</span>
        {#if id.includes('cc')}<CreditCardExtraInfo class="creditcard-extra-info" />{/if}
        {#if id.includes('mm')}<MetamaskExtraInfo class="metamask-extra-info" />{/if}
      </div>
    </div>
  </div>
</button>

<style lang="postcss">
  .payment-btn {
    border-radius: var(--button-payment-method-border-radius, 0.5rem); /* tailwind rounded-lg */
    border-color: var(--button-payment-method-border-color, rgb(243 244 246)); /* tailwind bg-gray-100 */
  }

  .aria.payment-btn:hover {
    @apply border border-transparent bg-origin-border;
    background: linear-gradient(#000000, #000000) padding-box,
      linear-gradient(var(--gradient-start-color) 0%, var(--gradient-end-color) 100%) border-box;
  }

  .payment-btn .icon-container {
    background: var(--button-payment-method-icon-bg, rgba(0, 0, 0, 0.04));
  }

  .payment-btn:hover > div {
    border-radius: var(--button-payment-method-border-radius, 0.5rem);
    background: var(--button-payment-method-active-bg-color, rgb(243 244 246)); /* tailwind bg-gray-100 */
  }

  .payment-btn:hover .icon-container {
    background: var(--button-payment-method-active-icon-bg, white);
  }

  .payment-btn:hover .title,
  .payment-btn:hover :global(.metamask-extra-info),
  .payment-btn:hover :global(.metamask-extra-info .information-icon-container) {
    border-color: var(--button-payment-method-active-font-color);
    color: var(--button-payment-method-active-font-color);
  }

  .payment-btn:hover :global(.creditcard-extra-info svg.creditcard-icon) {
    background: var(--payment-btn-credit-card-icons-active-bg, black);
  }

  .payment-btn:hover :global(.creditcard-extra-info svg.applepay),
  .payment-btn:hover :global(.creditcard-extra-info svg.gpay) {
    background: var(--payment-btn-credit-card-apple-gpay-icons-active-bg, transparent);
    fill: var(--payment-btn-credit-card-apple-gpay-icons-active-color);
    border-color: var(--payment-btn-credit-card-apple-gpay-icons-active-border-color, #ebebeb);
  }
</style>
