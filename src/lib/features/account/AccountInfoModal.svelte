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
    } catch {
      toast.danger('There was an error submitting your request. Please try again.');
    } finally {
      saving = false;
    }
  }
</script>

{#if isOpen}
  <Modal title="Edit Profile" on:close={() => closeModal()}>
    <div class="p-6">
      <div class="text-gray-500 italic font-extrabold">Lorem ipsum dolor sit amet, adipiscing elit.</div>
      <div class="mt-2">
        <Input let:klass>
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
      <Button on:click={handleUpdate} disabled={editableUsername.length === 0 || saving}>Update username</Button>
    </div>
  </Modal>
{/if}
