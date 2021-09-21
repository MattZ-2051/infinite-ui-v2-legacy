<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import { user } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';

  let copiedLink = false;

  const onCopyLink = async () => {
    await copy($user.hederaAccount);
    copiedLink = true;
    setTimeout(() => {
      copiedLink = false;
    }, 5000);
  };
</script>

<button
  type="button"
  on:click={onCopyLink}
  class="flex flex-grow justify-between bg-gray-200 p-4 rounded-lg font-bold text-lg group"
>
  <span>Wallet Address</span>
  <div class="flex gap-2">
    <span>{$user.hederaAccount}</span>
    {#if copiedLink}
      <Icon path={mdiCheckCircle} color="green" />
    {:else}
      <Icon path={mdiContentCopy} class="group-hover:opacity-40" />
    {/if}
  </div>
</button>
