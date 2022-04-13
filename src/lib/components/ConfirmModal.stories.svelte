<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import ConfirmModal from './ConfirmModal.svelte';

  const sku = {
    redeemable: true,
    issuer: {
      username: 'James Bond',
      profilePhotoUrl: 'https://images.loaded.gr/img/path/5a15998d-40f3-428e-99aa-441d7d1a9c86_sean-connery_faam.jpg',
    },
    name: 'Submarine IV',
    maxSupply: 1,
  };
</script>

<Meta title="Lib / components / ConfirmModal" component={ConfirmModal} />

<Template let:args>
  <ConfirmModal {...args} onConfirm={() => alert('onConfirm executed')} onCancel={() => alert('onCancel executed')} />
</Template>

<Story
  name="Message string"
  args={{ title: 'Remove Credit Card?', message: `You are going to delete card ending in 7856.`, isOpen: true }}
/>
<Story
  name="Message component"
  args={{
    isOpen: true,
    title: 'Buy Product?',
    labels: { confirm: 'Purchase', cancel: 'Cancel' },
    message: ProductModalInfo,
    messageData: { sku },
  }}
/>
