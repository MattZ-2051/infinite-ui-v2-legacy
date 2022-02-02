<script lang="ts">
  import { openModal } from '$ui/modals';
  import AccountEditButton from './AccountEditButton.svelte';
  import AccountPhotoUploadModal from './AccountPhotoUploadModal.svelte';

  let avatarUpload: HTMLInputElement;

  function onFileSelected() {
    let imageSource = URL.createObjectURL(avatarUpload.files[0]);
    openModal(AccountPhotoUploadModal, { imageSource });
    avatarUpload.value = '';
  }
</script>

<div class="absolute right-2.5 z-10" style="bottom:var(--edit-profile-picture-bottom-positioning, 0.625rem)">
  <AccountEditButton on:click={() => avatarUpload.click()} />
</div>

<input class="hidden" type="file" accept=".jpg, .jpeg, .png" on:change={onFileSelected} bind:this={avatarUpload} />
