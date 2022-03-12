<script lang="ts">
  import type { VoucherModalStatus } from './types';
  import { Modal } from '$ui/modals';
  import Icon from '$ui/icon/Icon.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import Input from '$lib/components/form/input/Input.svelte';
  import Button from '$lib/components/Button.svelte';
  import { onSignIn } from '$lib/user';
  import routes from '$project/routes';
  import { validateVoucherCode } from './voucher.api';
  import successIcon from '../assets/success-mint';

  export let voucherCode = '';
  export let skuId: string;

  let buttonTitle = 'Validate code';
  let title = 'Voucher code';
  let voucherCodeStatus: VoucherModalStatus;
  let errorMessage = '';
  let error = false;

  $: voucherCodeStatus = voucherCode.length === 12 ? 'valid-length' : 'button-disabled';

  $: switch (voucherCodeStatus) {
    case 'valid-length': {
      title = 'Voucher code';
      buttonTitle = 'Validate code';
      errorMessage = '';
      error = false;
      break;
    }
    case 'not-valid': {
      title = 'Voucher code';
      errorMessage = 'Voucher code not valid. Please check it and try again.';
      buttonTitle = 'Try again';
      error = true;
      break;
    }
    case 'already-used': {
      title = 'Voucher code';
      errorMessage = 'This code has already been used and is no longer valid';
      buttonTitle = 'Close';
      error = true;
      break;
    }
    case 'button-disabled': {
      title = 'Voucher code';
      buttonTitle = 'Validate code';
      errorMessage = '';
      error = false;
      break;
    }
    case 'success': {
      title = 'Voucher code valid';
      errorMessage = '';
      buttonTitle = '';
      error = false;
      break;
    }
  }

  const handleCodeSubmition = async () => {
    if (voucherCodeStatus === 'valid-length') {
      try {
        await validateVoucherCode({ voucherCode });
        voucherCodeStatus = 'success';
        // this setTimeout is here so the user can see the success modal quickly before being redirected
        setTimeout(() => {
          onSignIn(routes.checkoutSku(skuId));
        }, 500);
      } catch (apiError) {
        if (apiError.status === 601) {
          // 601 voucher code is invalid format
          voucherCodeStatus = 'not-valid';
          error = true;
        } else if (apiError.status === 602) {
          // 602 voucher code is already used
          voucherCodeStatus = 'already-used';
          error = true;
        } else {
          voucherCodeStatus = 'not-valid';
          error = true;
        }
      }
    }
  };
</script>

<div>
  <Modal class="max-w-lg" role="voucher-modal" closeButton={voucherCodeStatus === 'success' ? false : true}>
    {#if voucherCodeStatus === 'success'}
      <header class="flex items-center gap-2 pt-8 pb-4 px-10">
        <Icon viewBox="0 0 56 56" size="46px" path={successIcon} slot="header" />
        <div class="text-2xl font-normal pr-8 modal-title">{title}</div>
      </header>
    {:else}
      <header class="flex items-center gap-2 pt-8 pb-4 px-10">
        <div class="text-2xl font-normal pr-8 modal-title">{title}</div>
      </header>
    {/if}
    <div class="flex flex-col px-10">
      {#if voucherCodeStatus !== 'success'}
        <p class="text-base text-black-opacity-40 font-normal py-8">
          Enter the voucher code you received on your email to proceed to checkout.
          {voucherCode}
        </p>
      {/if}
      <Input
        variant="base"
        type="text"
        data-testId="voucher-input"
        placeholder="Enter Voucher code"
        class="border pl-4 text-black rounded-lg pt-4"
        style="padding-bottom: 1rem;"
        error={error && errorMessage}
        bind:value={voucherCode}
      />

      <Button
        data-testId="voucher-button"
        variant="brand"
        class="my-8 h-16 text-xl"
        role="button"
        disabled={voucherCodeStatus === 'button-disabled'}
        on:click={handleCodeSubmition}
      >
        {#if voucherCodeStatus === 'success' || voucherCodeStatus === 'processing'}
          <DualRingLoader />
        {:else}
          {buttonTitle}
        {/if}
      </Button>
    </div>
  </Modal>
</div>
