<script lang="ts">
  import type { Sku, Product, Profile } from '$lib/sku-item/types';
  import notifications from '$lib/toast/toast.store';
  import { Tabs, Tab } from '$ui/tabs';
  import Modal from '$ui/modal/Modal.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import { user } from '$lib/user';
  import AccountHeader from './AccountHeader.svelte';
  import { editUsername } from './account.api';

  export let skus: Sku[];
  export let products: Product[];
  export let profile: Profile;

  let showDialog = false;
  let editableUsername = profile?.username || '';

  async function handleUpdate() {
    try {
      await editUsername({ username: editableUsername });
      showDialog = false;
      notifications.success('Your username was successfully updated!');
    } catch (error) {
      notifications.danger(
        error || 'There was an error submitting your request. Please try again.'
      );
    }
  }
</script>

{#if $user}
  <AccountHeader {profile} on:edit={() => (showDialog = true)} />

  <Modal
    bind:open={showDialog}
    title="Edit Profile"
    on:close={() => (editableUsername = profile?.username)}
  >
    <div class="text-gray-500 italic font-extrabold">
      Lorem ipsum dolor sit amet, adipiscing elit.
    </div>
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
    <div slot="actions">
      <Button on:click={handleUpdate} disabled={editableUsername.length === 0}
        >Update username</Button
      >
    </div>
  </Modal>

  <div class="container mt-8 lg:mt-12">
    <Tabs class="text-xl md:text-2xl font-light mb-4" itemClass={'pb-4 md:pb-8'}>
      <Tab title="My Releases">
        <SkuItemGrid {skus} />
      </Tab>
      <Tab title="Items">
        <SkuItemGrid {products} />
      </Tab>
    </Tabs>
  </div>
{/if}
