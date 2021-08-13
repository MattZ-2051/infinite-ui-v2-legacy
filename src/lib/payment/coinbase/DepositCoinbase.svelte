<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { getPersonalToken } from '$lib/user';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import { generateUID, getServiceURI, handleServiceMessage } from './index';

  const dispatch = createEventDispatcher();

  let uid: string;
  let serviceURI: string;
  let loaded = false;

  (async () => {
    const personalToken = await getPersonalToken();
    uid = generateUID();
    serviceURI = getServiceURI(uid, personalToken);
  })();
</script>

<svelte:window on:message={(message) => handleServiceMessage(message, uid, dispatch)} />

{#if serviceURI}
  <iframe
    src={serviceURI}
    title=""
    scrolling="no"
    frameBorder="no"
    class="fixed top-0 bottom-0 right-0 left-0 w-full h-full bg-black bg-opacity-50"
    on:load={() => (loaded = true)}
  />
{/if}
{#if !loaded}
  <FullScreenLoader class="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 text-white" />
{/if}
