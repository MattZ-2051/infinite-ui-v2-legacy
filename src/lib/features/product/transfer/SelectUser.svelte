<script lang="ts">
  import { mdiCheckCircle, mdiCloseCircle, mdiLoading } from '@mdi/js';
  import debounce from 'p-debounce';
  import type { Profile } from '$lib/sku-item/types';
  import { browser } from '$app/env';
  import { user } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';
  import Search from '$lib/components/Search.svelte';
  import { searchUsersFx } from './product-transfer.store';

  export let selectedUser: Profile = undefined;

  const perPage = 5;

  let page = 1;
  let users: Profile[] = undefined;
  let username: string = undefined;
  const loading = searchUsersFx.pending;

  const getUsers = debounce(
    async (page_: number) => {
      selectedUser = undefined;
      page = page_ || 1;

      ({ data: users } = username ? await searchUsersFx({ username, page, perPage, skipTenant: true }) : { data: [] });

      if (users.length > 0) {
        selectUser(users[0]);
      }
    },
    browser ? 300 : 0
  );

  async function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    username = value && value.trim() !== '' ? value : undefined;
    users = undefined;

    await getUsers(1);
  }

  function selectUser(user_: Profile) {
    if (user_._id === $user._id) {
      return;
    }

    selectedUser = user_;
  }
</script>

<div class="grid grid-cols-1 gap-4 relative pt-6">
  <div>Please enter the exact username of the account you'd like to transfer this collectible to.</div>
  <Search placeholder="Search for a username to send the NFT" on:input={handleInput} data-initial-focus />
  <div class="absolute right-0 bottom-2">
    {#if users && username}
      {#if users.length > 0}
        {#if users[0]._id === $user._id}
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
