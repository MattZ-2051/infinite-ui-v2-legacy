<script lang="ts">
  /* eslint-disable unicorn/prefer-ternary */
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import { browser } from '$app/env';
  import { InfiniteExtensionLoadFx, InfiniteExtensionStore } from '$lib/features/infinite-wallet/infinite-wallet.store';
  import FormElement from '$lib/components/form/FormElement.svelte';
  import tooltip from '$ui/tooltip';
  import { INFINITE_EXTENSION_ENABLED } from '$project/variables';

  export let selectedWallet: string = undefined;

  const schema = yup.object({
    walletAddress: yup
      .string()
      .required('Hedera wallet address is required.')
      .matches(/\d\.\d\.\d{4}/, '*Invalid Hedera wallet address format'),
  });

  const { form, errors, data, isValid } = createForm<{ walletAddress: string }>({
    initialValues: {
      walletAddress: selectedWallet ?? $InfiniteExtensionStore.current?.id ?? '',
    },
    onSubmit: async ({ walletAddress }) => {
      selectedWallet = walletAddress;
    },
    validate: validateSchema(schema),
  });

  $: if ($isValid) {
    selectedWallet = $data.walletAddress;
  } else {
    selectedWallet = undefined;
  }

  $: externalWalletSelected = () =>
    $InfiniteExtensionStore.loggedIn && selectedWallet === $InfiniteExtensionStore.current?.id;

  $: tooltipLable = externalWalletSelected()
    ? 'The wallet address has been retrieved from your browser extension, you do not need to change it.'
    : '';

  if (browser && INFINITE_EXTENSION_ENABLED) {
    InfiniteExtensionLoadFx();
  }
</script>

<div>
  <form
    data-style="container"
    use:form
    autocomplete="off"
    use:tooltip={tooltipLable}
    class="wallet-input"
    class:invalid={!$isValid}
  >
    <FormElement
      name="walletAddress"
      variant="rounded"
      label={externalWalletSelected()
        ? 'Transfer to your connected external wallet:'
        : 'Enter your wallet address to send this NFT:'}
      placeholder="0.0.0000"
    />
    {#if $errors.walletAddress}
      <p class="text-sm text-red-500 mt-4 text-center">{$errors.walletAddress}</p>
    {/if}
  </form>
</div>

<style lang="postcss">
  .wallet-input :global(input) {
    @apply py-4 px-6 bg-black-opacity-10 rounded-xl text-center mt-4;
  }

  .wallet-input.invalid :global(input) {
    @apply text-red-500;
  }

  .wallet-input :global(label) {
    @apply text-gray-600;
  }

  .wallet-input :global(.input-container) {
    border: 0;
  }
</style>
