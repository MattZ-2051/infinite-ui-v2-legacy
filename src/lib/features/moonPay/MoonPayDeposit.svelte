<script>
  import { onMount } from 'svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import Button from '$lib/components/Button.svelte';
  import { Modal } from '$ui/modals';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { getSignedUrl } from './moonPay.api';

  $: url = undefined;
  onMount(async () => {
    url = await getSignedUrl();
  });

  let openConfirmModal = false;
  let openMainModal = true;

  const onCloseConfirmModal = () => {
    openConfirmModal = false;
    openMainModal = false;
    goto(routes.wallet);
  };
</script>

{#if !url}
  <FullScreenLoader>Loading...</FullScreenLoader>
{:else if openMainModal}
  <Modal title="Deposit" class="max-w-lg h-full" onClose={() => (openConfirmModal = true)}>
    <div style="height:78vh">
      <iframe
        allow="accelerometer; autoplay; camera; gyroscope; payment"
        frameborder="0"
        height="100%"
        src={url}
        width="100%"
        title="MoonPay deposit"
        class="max-w-lg px-7 border-0 m-auto"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  </Modal>
{/if}

{#if openConfirmModal}
  <Modal title={'Exit Deposit?'} class="max-w-lg border border-gray-400" onClose={() => (openConfirmModal = false)}>
    <div class="px-10 pt-3 pb-8">
      <div>If you exit before the completion of the transaction, any progress will be lost.</div>
      <br />
      <div>
        In case the transaction is complete, it will take between a few minutes and half an hour to show up in your
        history.
      </div>
      <div class="flex flex-col gap-8 justify-content-center h-full mt-8">
        <Button variant="brand" on:click={onCloseConfirmModal}>Accept</Button>
        <Button variant="outline-brand" on:click={() => (openConfirmModal = false)}>Cancel</Button>
      </div>
    </div>
  </Modal>
{/if}
