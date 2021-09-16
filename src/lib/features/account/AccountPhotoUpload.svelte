<script lang="ts">
  import { toast } from '$ui/toast';
  import { post } from '$lib/api';
  import { updateUser } from '$lib/user';
  import AccountEditButton from './AccountEditButton.svelte';

  let avatarUpload: HTMLInputElement;
  let uploading = false;

  async function onFileSelected() {
    const data = new FormData();

    data.append('image', avatarUpload.files[0]);

    uploading = true;
    await post('users/photo-upload/me', data)
      .then(() => updateUser())
      .catch((error) => {
        if (error?.data?.appCode === 'PHOTO_TOO_LARGE') {
          toast.danger('Your image is too large. Please use a profile photo that is < 5 MB.');
        } else {
          toast.danger('Failed to upload the avatar image. Please, try again.');
        }
      })
      .finally(() => {
        uploading = false;
        avatarUpload.value = '';
      });
  }
</script>

<div class="absolute bottom-2.5 right-2.5 z-10">
  <AccountEditButton on:click={() => avatarUpload.click()} loading={uploading} />
</div>

<input
  class="hidden"
  type="file"
  accept=".jpg, .jpeg, .png"
  on:change={async () => await onFileSelected()}
  bind:this={avatarUpload}
/>
