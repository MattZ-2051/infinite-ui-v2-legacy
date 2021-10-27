<script lang="ts">
  import type Cropper from 'cropperjs';
  import { onMount } from 'svelte';
  import { toast } from '$ui/toast';
  import { post } from '$lib/api';
  import { updateUser } from '$lib/user';
  import { Modal, closeModal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';

  export let imageSource;
  let previewImage: HTMLImageElement;
  let cropper: Cropper;
  let loading: boolean;

  onMount(async () => {
    const [{ default: cropperTool }] = await Promise.all([
      import('cropperjs'),
      import('cropperjs/dist/cropper.min.css'),
    ]);
    cropper = new cropperTool(previewImage, {});
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
    <div class="w-full mt-4 flex flex-col items-center">
      <div class="relative">
        {#if !cropper}
          <div class="absolute bg-opacity-70 bg-white inset-0 flex items-center justify-center">
            <div class="flex flex-col">
              <DualRingLoader />
              <div>Loading...</div>
            </div>
          </div>
        {/if}
        <img class="h-96" id="image" bind:this={previewImage} src={imageSource} alt="" />
      </div>

      <Button
        disabled={loading || !cropper}
        variant="brand"
        on:click={cropImage}
        class="self-center w-full py-3 text-2xl text-center mt-6">Save</Button
      >
    </div>
  </div>
</Modal>
