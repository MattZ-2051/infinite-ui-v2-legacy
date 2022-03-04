<script lang="ts">
  import { Modal } from '$ui/modals';
  import Input from '$lib/components/form/input/Input.svelte';
  import Button from '$lib/components/Button.svelte';

  export let isValidCode: boolean = undefined;
  export let voucherCode = '';

  // eslint-disable-next-line unicorn/no-nested-ternary
  $: buttonTitle = isValidCode ? 'Proceed to checkout' : isValidCode !== undefined ? 'Try again' : 'Validate Code';
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
        error={!isValidCode && isValidCode !== undefined && 'Voucher code not valid. Please check it and try again.'}
        success={!!isValidCode && 'Voucher code valid.'}
        bind:value={voucherCode}
      />

      <Button
        data-testId="voucher-button"
        variant="brand"
        class="my-8 h-16 text-xl"
        disabled={voucherCode === '' || !isValidCode}
        role="button">{buttonTitle}</Button
      >
    </div>
  </Modal>
</div>
