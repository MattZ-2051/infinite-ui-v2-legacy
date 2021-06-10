<script>
  import { Tabs, Tab } from '$ui/tabs';
  import Modal from '$ui/modal/Modal.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import AccountHeader from './AccountHeader.svelte';

  let showDialog = false;

  let user = { handle: 'KaTowns' };
</script>

<AccountHeader userHandle={user.handle} on:edit={() => (showDialog = true)} />

<Modal bind:value={showDialog} title="Edit Profile">
  <div class="text-gray-500 italic font-extrabold">
    Lorem ipsum dolor sit amet, adipiscing elit.
  </div>
  <div class="mt-2">
    <Input placeholder={user.handle} aria-label="Full name" class="font-black">
      <div slot="before" class="text-gray-400">@</div>
    </Input>
  </div>
  <div slot="actions">
    <Button on:click={() => (showDialog = false)}>Update username</Button>
  </div>
</Modal>

<div class="container mt-8 lg:mt-12">
  <Tabs class="text-xl md:text-2xl font-light" itemClass={'pb-4 md:pb-8'}>
    <Tab title="My Releases"><div><SkuItemGrid class="mt-4" /></div></Tab>
    <Tab title="Items">Tab 2!!!!!</Tab>
    <!-- <div slot="extra">extra data!!!</div> -->
  </Tabs>
</div>
