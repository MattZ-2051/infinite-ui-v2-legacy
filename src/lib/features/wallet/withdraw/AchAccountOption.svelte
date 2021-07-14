<script lang="ts">
  import type { AchAccount } from './types';
  import { mdiArrowRight, mdiDeleteOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  export let achAccount: AchAccount;
  export let deleteMode: boolean;

  $: disabled = !deleteMode && achAccount.circleInfo.status !== 'complete';
</script>

<button
  {disabled}
  class="w-full grid grid-cols-3 auto-cols-fr place-content-between items-center gap-4 border-black rounded-2xl border-2 overflow-hidden p-2 text-xl"
  class:cursor-default={disabled}
  on:click
>
  <div class="flex items-center">
    <img src={achAccount.plaidInfo.institution_logo} alt="Institution Logo" class="w-14 mr-4" />
    <span class="font-semibold">{achAccount.plaidInfo.metadata.institution.name}</span>
  </div>
  <span class="text-gray-500">xxxx{achAccount.plaidInfo.metadata.account.mask}</span>
  {#if achAccount.circleInfo.status === 'pending'}
    <span class="text-gray-500">Pending Approval</span>
  {:else if achAccount.circleInfo.status === 'failed'}
    <span class="text-red-500">Approval Failed</span>
  {:else if achAccount.circleInfo.status === 'complete'}
    <Icon path={deleteMode ? mdiDeleteOutline : mdiArrowRight} class="text-black justify-self-end" />
  {/if}
</button>
