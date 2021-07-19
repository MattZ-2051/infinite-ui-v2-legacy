<script lang="ts">
  import { closeModal, Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import { user, updateUser } from '$lib/user';
  import { editUsername } from './account.api';

  export let isOpen: boolean;

  let editableUsername = $user.username;

  let saving: boolean;
  async function handleUpdate() {
    saving = true;
    try {
      await editUsername({ username: editableUsername });
      updateUser();
      closeModal();
      toast.success('Your username was successfully updated!');
    } catch (error) {
      if (error?.data?.error === 'Conflict') {
        toast.danger('The username you selected is already taken. Please choose a diffent one.');
      } else {
        toast.danger('There was an error submitting your request. Please try again.');
      }
    } finally {
      saving = false;
    }
  }
</script>

{#if isOpen}
  <Modal title="Edit Profile" on:close={() => closeModal()}>
    <div class="px-6 py-2">
      <div class="mt-2">
        <Input let:klass label="Username">
          <div slot="before" class="text-gray-400">@</div>
          <input
            bind:value={editableUsername}
            placeholder={$user.username}
            aria-label="Full name"
            class="{klass} font-black"
          />
        </Input>
      </div>
    </div>
    <div slot="footer">
      <Button
        on:click={handleUpdate}
        disabled={editableUsername.length === 0 || editableUsername === $user.username || saving}>Update</Button
      >
    </div>
  </Modal>
{/if}
