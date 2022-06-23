<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import { isEthAddress } from '$util/validateEthAddress';
  import { Modal, closeModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import Radiobutton from '$ui/radiobutton/Radiobutton.svelte';
  import { web3User } from '$lib/web3/web3.stores';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import Icon from '$ui/icon/Icon.svelte';
  import { connectWallet } from './checkout.service';

  export let handleEthModalCallback: ({ address, option }) => void;

  $: walletConnected = $web3User.walletConnected;

  const title = 'NFT destination';
  const options = [
    { id: 1, value: 'manual', label: 'Enter ETH address' },
    { id: 2, value: 'metamask', label: walletConnected ? 'Continue with MetaMask' : 'Connect MetaMask' },
    {
      id: 3,
      value: 'later',
      label: `I don't have an ETH address`,
    },
  ];

  let radioValue;
  let address;
  $: buttonText = 'Continue';
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

  const handleSubmit = async () => {
    if (radioValue === 'metamask' && !walletConnected) {
      try {
        await connectWallet();
        handleEthModalCallback({ address, option: radioValue });
        closeModal();
      } catch (error) {
        if (error?.code) {
          toast.danger(error?.message, { toastId: error?.code });
        } else {
          toast.danger(error?.message, { toastId: 'MM-NOT-FOUND' });
          window.open('https://metamask.io/download/', '_blank').focus();
        }
      }
    } else {
      handleEthModalCallback({ address, option: radioValue });
      closeModal();
    }
  };

  $: if (radioValue === 'manual') {
    buttonText = 'Continue with ETH address';
  } else if (radioValue === 'metamask' && !walletConnected) {
    buttonText = 'Connect MetaMask';
  } else if (radioValue === 'metamask' && walletConnected) {
    buttonText = 'Continue with MetaMask';
  } else if (radioValue === 'later') {
    buttonText = `I don't have an ETH address`;
  }
</script>

<Modal class="max-w-lg">
  <svelte:fragment slot="title"><span class="font-medium text-2xl">{title}</span></svelte:fragment>
  <div class="px-10 flex flex-col gap-6 pb-10">
    <span class="text-base" style="color: var(--gray-500)">
      In order to receive this NFT, you need a wallet with an ETH address. You can enter one manually or connect your
      MetaMask.
    </span>
    <span class="text-base" style="color: var(--gray-500)"
      >If you don't have one at this moment, you can continue without a wallet:</span
    >
    <div>
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
      class="mt-6"
      disabled={!radioValue || (radioValue === 'manual' && !validEthAddress)}
      on:click={() => handleSubmit()}
    >
      {buttonText}
    </Button>
  </div>
</Modal>
