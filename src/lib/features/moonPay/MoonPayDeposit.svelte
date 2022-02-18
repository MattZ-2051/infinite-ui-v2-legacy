<script>
  import { onMount } from 'svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import { Modal } from '$ui/modals';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { getSignedUrl } from './moonPay.api';

  $: url = undefined;
  onMount(async () => {
    url = await getSignedUrl();
  });

  let openMainModal = true;

  const onCloseModal = () => {
    openMainModal = false;
    goto(routes.wallet);
  };
</script>

{#if !url}
  <FullScreenLoader>Loading...</FullScreenLoader>
{:else if openMainModal}
  <Modal title="Deposit" class="max-w-lg h-full" onClose={onCloseModal}>
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
