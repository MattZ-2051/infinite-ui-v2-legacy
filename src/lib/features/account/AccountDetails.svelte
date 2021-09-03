<script lang="ts">
  import type { User } from '$lib/user/types';
  import { mdiAccountDetails } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import AccountEditButton from './AccountEditButton.svelte';
  import AccountDetailsForm from './AccountDetailsForm.svelte';

  export let user: User;
  let editing = false;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <div class="text-2xl  flex items-center gap-2">
        <Icon path={mdiAccountDetails} /> Profile Details
      </div>
      <div class:hidden={editing}>
        <AccountEditButton
          on:click={() => {
            editing = true;
          }}
        />
      </div>
    </div>
    <div style="height: 2px; background-color: #EBEBEB;" />
  </div>

  {#key user}
    <AccountDetailsForm on:closeForm={() => (editing = false)} {user} disabled={!editing} />
  {/key}
</div>
