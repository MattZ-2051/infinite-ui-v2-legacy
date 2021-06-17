<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { getPersonalToken } from '$lib/user';
  import { generateUID, getServiceURI, handleServiceMessage } from './index';

  const dispatch = createEventDispatcher();

  let uid: string;
  let serviceURI: string;

  onMount(async () => {
    const personalToken = await getPersonalToken();
    uid = generateUID();
    serviceURI = getServiceURI(uid, personalToken);
  });
</script>

<svelte:window on:message={(message) => handleServiceMessage(message, uid, dispatch)} />

<div class="fixed w-full h-full top-0 left-0 z-40">
  <div class="h-full w-full absolute flex items-center justify-center z-20">
    <iframe src={serviceURI} title="" scrolling="no" frameBorder="no" class="min-w-min" />
  </div>
</div>

<style lang="postcss">
  iframe {
    height: 585px;
  }
</style>
