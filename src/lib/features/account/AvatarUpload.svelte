<script lang="ts">
  import { post } from '$lib/api';
  import { updateUser } from '$lib/user';
  import { toast } from '$ui/toast';

  let avatarUpload: HTMLInputElement;

  async function onFileSelected() {
    const data = new FormData();

    data.append('image', avatarUpload.files[0]);

    await post('users/photo-upload/me', data)
      .then(() => updateUser())
      .catch(() => toast.danger('Failed to upload the avatar image. Please, try again.'))
      .finally(() => (avatarUpload.value = ''));
  }
</script>

<div
  class="opacity-0 group-hover:opacity-100 upload absolute bg-black bg-opacity-70	bg-center bg-no-repeat cursor-pointer"
  on:click={() => avatarUpload.click()}
/>

<input
  class="hidden"
  type="file"
  accept=".jpg, .jpeg, .png"
  on:change={async () => await onFileSelected()}
  bind:this={avatarUpload}
/>

<style>
  .upload {
    width: 32px;
    height: 32px;
    border-radius: 20px;
    background-image: url(/upload-avatar.svg);
  }
</style>
