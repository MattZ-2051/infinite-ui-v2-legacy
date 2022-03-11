<script lang="ts">
  import { Modal } from '$ui/modals';
  import Input from '$lib/components/form/input/Input.svelte';
  import Button from '$lib/components/Button.svelte';

  export let voucherCode = '';

  $: validCodeLength = voucherCode.length === 12;
  $: voucherCodeError = undefined;
  // eslint-disable-next-line unicorn/no-nested-ternary
  $: buttonTitle = voucherCodeError ? 'Try again' : 'Validate code';
</script>

<div>
  <Modal class="max-w-lg" title="Voucher code" role="voucher-modal">
    <div class="flex flex-col px-10">
      <p class="text-base text-black-opacity-40 font-normal py-8">
        Enter the voucher code you received on your email to proceed to checkout.
        {voucherCode}
      </p>
      <Input
        variant="base"
        type="text"
        data-testId="voucher-input"
        placeholder="Enter Voucher code"
        class="border pl-4 text-black rounded-lg pt-4"
        style="padding-bottom: 1rem;"
        error={voucherCodeError === false && 'Voucher code not valid. Please check it and try again.'}
        success={voucherCodeError === true && 'Voucher code valid.'}
        bind:value={voucherCode}
      />

      <Button
        data-testId="voucher-button"
        variant="brand"
        class="my-8 h-16 text-xl"
        disabled={!validCodeLength}
        role="button">{buttonTitle}</Button
      >
    </div>
  </Modal>
</div>
