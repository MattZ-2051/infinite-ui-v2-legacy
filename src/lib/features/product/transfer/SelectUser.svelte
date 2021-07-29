<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { onMount } from 'svelte';
  import { mdiCheckCircle } from '@mdi/js';
  import { user } from '$lib/user';
  import PaginationVariantDark from '$ui/pagination/variants/PaginationVariantDark.svelte';
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

  async function getUsers(page_ = 1) {
    selectedUser = undefined;
    page = page_;

    ({ total, data: users } = await searchUsersFx({ search, page, perPage }));
  }

  async function onPaginationChanged(page_: number) {
    await getUsers(page_);
  }

  async function onInput(value: string) {
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
  <div class="font-medium text-xl text-center">Select a user</div>
  <Search {onInput} placeholder={'Search for a user'} debouncePeriod={300} data-initial-focus />
  <div class="grid grid-cols-1 gap-2" class:opacity-50={$loading}>
    {#each users as user_}
      <button
        type="button"
        class:selected={selectedUser?._id === user_._id}
        class="flex justify-between items-center text-gray-400 font-medium w-full px-4 py-2 border-b hover:text-black hover:border-black"
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
      <PaginationVariantDark>
        <Pagination
          {page}
          {perPage}
          {total}
          on:change={async (event) => await onPaginationChanged(event.detail.value)}
        />
      </PaginationVariantDark>
    </div>
  {/if}
</div>

<style lang="postcss">
  .selected {
    @apply text-black border-black;
  }
</style>
