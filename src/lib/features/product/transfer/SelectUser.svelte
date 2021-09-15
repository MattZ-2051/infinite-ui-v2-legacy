<script lang="ts">
  import { mdiCheckCircle } from '@mdi/js';
  import debounce from 'p-debounce';
  import type { Profile } from '$lib/sku-item/types';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { user } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';
  import Pagination from '$ui/pagination/Pagination.svelte';
  import Search from '$lib/components/Search.svelte';
  import { searchUsersFx } from './product-transfer.store';

  export let selectedUser: Profile = undefined;

  const perPage = 5;

  let page = 1;
  let total: number;
  let users: Profile[] = [];
  let search: string = undefined;
  const loading = searchUsersFx.pending;

  const getUsers = debounce(
    async (page_: number) => {
      selectedUser = undefined;
      page = page_ || 1;

      ({ total, data: users } = await searchUsersFx({ search, page, perPage }));
    },
    browser ? 300 : 0
  );

  async function onPaginationChanged(page_: number) {
    await getUsers(page_);
  }

  async function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    search = value && value.trim() !== '' ? value : undefined;

    await getUsers(1);
  }

  function onSelectUser(user_: Profile) {
    if (user_._id === $user._id) {
      return;
    }

    selectedUser = user_;
  }

  onMount(async () => {
    await getUsers(1);
  });
</script>

<div class="grid grid-cols-1 gap-4">
  <Search placeholder="Search for a user to send the NFT" on:input={handleInput} data-initial-focus />
  <div class="grid grid-cols-1 gap-2" class:opacity-50={$loading}>
    {#each users as user_}
      <button
        type="button"
        class="flex justify-between items-center font-medium w-full px-4 py-2 border-b hover:text-black {selectedUser?._id ===
        user_._id
          ? 'text-black'
          : 'text-gray-400'}"
        class:cursor-default={user_._id === $user._id}
        class:cursor-pointer={user_._id !== $user._id}
        on:click={() => onSelectUser(user_)}
      >
        <div>
          {`@${user_.username}`}
          {#if user_._id === $user._id}
            <small>(me)</small>
          {/if}
        </div>
        {#if selectedUser?._id === user_._id}
          <div>
            <Icon path={mdiCheckCircle} color="green" />
          </div>
        {/if}
      </button>
    {/each}
    {#if search && (!users || users.length === 0)}
      <div class="text-gray-400 text-center w-full font-medium py-4">No Users Found</div>
    {/if}
  </div>
  {#if total}
    <div class="flex justify-center w-full" class:opacity-50={$loading}>
      <Pagination {page} {perPage} {total} on:change={async (event) => await onPaginationChanged(event.detail.value)} />
    </div>
  {/if}
</div>
