<script lang="ts">
  import { mdiCancel } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { getPersonaClient } from './persona-client';

  export let status: 'unverified';

  let personaClient;

  function launchKYCPersona() {
    personaClient =
      personaClient ||
      getPersonaClient({
        referenceId: 'ABC123', // this must be properly filled
        onLoadError: (error) => console.error(error),
        onComplete: (inquiryId) => console.log(`done with ${inquiryId}`),
        onStart: (inquiryId) => console.log(`started with ${inquiryId}`),
        onEvent: (name, meta) => console.log(name, meta),
      });

    personaClient.open();
  }
</script>

<svelte:head>
  <script src="https://cdn.withpersona.com/dist/persona-v3.10.0.js"></script>
</svelte:head>

<div class:flex={true} class:flex-row={true} {...$$restProps}>
  {#if status === 'unverified'}
    <div class="contents kyc-unverified">
      <Icon
        path={mdiCancel}
        rotate={90}
        class="mr-2 cursor-pointer focus:outline-none"
        tooltip={{
          content: '<a href="https://support.suku.world/infinite/how-does-kyc-work">Learn more</a>',
          interactive: true,
          allowHTML: true,
        }}
        on:click={launchKYCPersona}
      /> Unverified
    </div>
  {/if}
</div>

<style>
  .kyc-unverified {
    color: rgb(158, 158, 158);
  }
</style>
