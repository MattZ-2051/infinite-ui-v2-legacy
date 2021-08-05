<script lang="ts">
  import { mdiCancel, mdiClockOutline, mdiShieldCheckOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { wallet } from '../wallet.store';
  import { launchKYCPersona } from './personaClient.service';
</script>

{#if $wallet}
  <div class:flex={true} class:flex-row={true} class:font-semibold={true} {...$$restProps}>
    {#if $wallet.kycPending}
      <Icon path={mdiClockOutline} class="mr-2" /> Pending...
    {:else if $wallet.kycMaxLevel >= 1}
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
