<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { mdiBell } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { openModal } from '$ui/modals';
  import NotifyModal from './NotifyModal.svelte';

  export let profile: Profile;
</script>

<button type="button" on:click={() => openModal(NotifyModal, { profile })}
  ><span class="flex items-center gap-1"><Icon path={mdiBell} size="0.8" /><span>Notify me</span></span></button
>
