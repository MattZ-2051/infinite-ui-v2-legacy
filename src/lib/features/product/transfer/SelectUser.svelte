<script lang="ts">
  import { mdiCheckCircle, mdiCloseCircle, mdiLoading } from '@mdi/js';
  import debounce from 'p-debounce';
  import type { Profile } from '$lib/sku-item/types';
  import { browser } from '$app/env';
  import { user } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';
  import Search from '$lib/components/search/Search.svelte';
  import { getUserByUsernameFx } from './product-transfer.store';

  export let selectedUser: Profile | undefined = undefined;
  let candidateUser: Profile | undefined = undefined;
  let username: string = undefined;
  let isMyself = false;
  const loading = getUserByUsernameFx.pending;

  const getUsers = debounce(
    async () => {
      candidateUser = undefined;

      // eslint-disable-next-line unicorn/no-null
      candidateUser = username ? await getUserByUsernameFx({ username, skipTenant: true }) : null;

      if (candidateUser) {
        isMyself = candidateUser._id === $user._id;
        if (!isMyself) {
          selectedUser = candidateUser;
        }
      }
    },
    browser ? 300 : 0
  );

  async function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    selectedUser = undefined;
    candidateUser = undefined;
    username = value && value.trim() !== '' ? value : undefined;
    isMyself = false;
    await getUsers();
  }
</script>

<div class="grid grid-cols-1 gap-4 relative pt-6">
  <div>Please enter the exact username of the account you'd like to transfer this collectible to.</div>
  <Search placeholder="Search for a username to send the NFT" on:input={handleInput} data-initial-focus />
  <div class="absolute right-0 bottom-2">
    {#if candidateUser !== undefined && username}
      {#if candidateUser !== null}
        {#if isMyself}
          <Icon tooltip="Can't transfer to yourself!" class="text-red-600" path={mdiCloseCircle} />
        {:else}
          <Icon tooltip="Username Found!" class="text-green-600" path={mdiCheckCircle} />
        {/if}
      {:else}
        <Icon tooltip="Username Not Found" class="text-red-600" path={mdiCloseCircle} />
      {/if}
    {:else if $loading}
      <Icon class="animate-spin" path={mdiLoading} />
    {/if}
  </div>
</div>
