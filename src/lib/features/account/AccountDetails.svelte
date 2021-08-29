<script lang="ts">
  import { mdiAccountDetails } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import AccountEditButton from './AccountEditButton.svelte';
</script>

<div class="flex justify-between">
  <div class="text-2xl mb-4 flex items-center gap-2">
    <Icon path={mdiAccountDetails} /> Profile Details
  </div>
  <AccountEditButton />
</div>

<div style="height: 2px; background-color: #EBEBEB;" />
