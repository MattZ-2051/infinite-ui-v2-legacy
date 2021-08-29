<script lang="ts">
  import { toast } from '$ui/toast';
  import { post } from '$lib/api';
  import { updateUser } from '$lib/user';
  import AccountEditButton from './AccountEditButton.svelte';

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

<div class="absolute bottom-2.5 right-2.5 z-10">
  <AccountEditButton on:click={() => avatarUpload.click()} />
</div>

<input
  class="hidden"
  type="file"
  accept=".jpg, .jpeg, .png"
  on:change={async () => await onFileSelected()}
  bind:this={avatarUpload}
/>
