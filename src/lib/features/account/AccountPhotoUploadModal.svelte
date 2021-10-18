<script lang="ts">
  import { onMount } from 'svelte';
  import Cropper from 'cropperjs';
  import { toast } from '$ui/toast';
  import { post } from '$lib/api';
  import { updateUser } from '$lib/user';
  import { Modal, closeModal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import 'cropperjs/dist/cropper.min.css';

  export let imageSource;
  let previewImage: HTMLImageElement;
  let cropper: Cropper;
  let loading: boolean;

  onMount(() => {
    cropper = new Cropper(previewImage, {});
  });

  function cropImage() {
    const data = new FormData();
    cropper.getCroppedCanvas().toBlob(function (blob) {
      data.append('image', blob);
      uploadImage(data);
    });
  }

  async function uploadImage(data) {
    loading = true;
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
        loading = false;
        cropper.destroy();
        closeModal();
      });
  }
</script>

<Modal title="Edit photo">
  <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
    <div class="w-full mt-4">
      <img class="h-96" id="image" bind:this={previewImage} src={imageSource} alt="" />
      <Button
        disabled={loading}
        variant="brand"
        on:click={cropImage}
        class="self-center w-full py-3 text-2xl text-center mt-6">Save</Button
      >
    </div>
  </div>
</Modal>
