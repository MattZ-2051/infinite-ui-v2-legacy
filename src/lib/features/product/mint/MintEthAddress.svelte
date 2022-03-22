<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import { isEthAddress } from '$util/validateEthAddress';
  import Radiobutton from '$ui/radiobutton/Radiobutton.svelte';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import Icon from '$ui/icon/Icon.svelte';
  import { walletConnected } from '$lib/user';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';

  export let handleSubmit: ({ address, radioValue }) => void;
  export let isLoading: boolean;

  const options = [
    { id: 1, value: 'manual', label: 'Enter ETH address' },
    { id: 2, value: 'metamask', label: $walletConnected ? 'Continue with Metamask' : 'Connect Metamask' },
  ];

  let radioValue;
  let address;
  let buttonText = 'Mint';
  let copiedLink = false;

  $: validEthAddress = undefined;

  function onEthAddressInput(event) {
    const { value } = event.target as HTMLInputElement;
    address = value;
    validEthAddress = isEthAddress(value);
  }

  const onCopyLink = async () => {
    await copy(address);
    copiedLink = true;
    setTimeout(() => {
      copiedLink = false;
    }, 5000);
  };

  $: if (radioValue === 'manual') {
    buttonText = 'Mint NFT to ETH address';
  } else if (radioValue === 'metamask' && !$walletConnected) {
    buttonText = 'Mint NFT to Metamask';
  } else if (radioValue === 'metamask' && $walletConnected) {
    buttonText = 'Mint NFT to Metamask';
  }
</script>

<span class="font-medium text-3xl">Mint NFT</span>
<div class="flex flex-col gap-6 mt-8">
  <span class="text-base" style="color: var(--gray-500)">
    To mint this NFT you need a wallet with an ETH address. You can enter one manually or connect your Metamask.
  </span>
  <div class="pl-2">
    <Radiobutton {options} bind:userSelected={radioValue} showInput={radioValue === 'manual'}>
      {#if radioValue === 'manual'}
        <div class="pb-5">
          <Input
            name="eth-address"
            class={`mb-2 border border-solid border-gray-100 rounded-md ${
              validEthAddress === false ? 'text-red-500' : ''
            }`}
            style="padding-bottom: 1rem; padding-top: 1rem"
            variant="base"
            error={validEthAddress === false ? 'This does not appear to be a valid ERC20 address' : ''}
            value={address}
            on:input={onEthAddressInput}
          >
            <svelte:fragment slot="after">
              {#if validEthAddress === true}
                {#if copiedLink}
                  <Icon path={mdiCheckCircle} color="green" />
                {:else}
                  <Icon path={mdiContentCopy} class="group-hover:opacity-40 ml-2" on:click={onCopyLink} />
                {/if}
              {/if}
            </svelte:fragment>
          </Input>
        </div>
      {/if}
    </Radiobutton>
  </div>

  <Button
    variant="brand"
    class="mt-6 h-16 text-2xl"
    disabled={!radioValue || (radioValue === 'manual' && !validEthAddress) || isLoading}
    on:click={() => handleSubmit({ address, radioValue })}
  >
    {#if isLoading}
      <DualRingLoader />
    {:else}
      {buttonText}
    {/if}
  </Button>
</div>
