<script lang="ts">
  import { mdiCancel, mdiClockOutline, mdiShieldCheckOutline } from '@mdi/js';
  import { getPersonalToken } from '$lib/user';
  import { variables } from '$lib/variables';
  import { wallet } from '$lib/features/wallet/index';
  import { loadWallet } from '$lib/features/wallet/wallet.api';
  import Icon from '$ui/icon/Icon.svelte';
  import { toast } from '$ui/toast';
  import injectScript from '$util/injectScript';

  let personaClient;

  function getPersonaClient(referenceId: string) {
    // eslint-disable-next-line no-undef
    const client = new Persona.Client({
      templateId: variables.persona.templateId,
      environment: variables.persona.environment,
      referenceId,
      onLoad: (error) => {
        if (error) {
          toast.danger('Failed to load the KYC verification form. Please, try again.');
        }

        client.render();
      },
      // onStart: (inquiryId) => {}
      onComplete: (/*inquiryId*/) => loadWallet(),
      // onEvent: (name, meta) => {}
    });

    return client;
  }

  async function launchKYCPersona() {
    await injectScript({ id: 'persona', url: 'https://cdn.withpersona.com/dist/persona-v3.10.0.js' });
    personaClient = personaClient || getPersonaClient(await getPersonalToken());

    personaClient.open();
  }
</script>

{#if $wallet}
  <div class:flex={true} class:flex-row={true} class:font-semibold={true} {...$$restProps}>
    {#if $wallet.kycPending && false}
      <Icon path={mdiClockOutline} class="mr-2" /> Pending...
    {:else if $wallet.kycMaxLevel >= 1 && false}
      <Icon path={mdiShieldCheckOutline} class="mr-2" /> lvl {$wallet.kycMaxLevel}
    {:else}
      <div class="contents text-gray-400">
        <Icon
          path={mdiCancel}
          rotate={90}
          class="mr-2 cursor-pointer hover:text-black"
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
{/if}
