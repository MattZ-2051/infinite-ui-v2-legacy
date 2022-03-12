<script lang="ts">
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import VoucherModal from './VoucherModal.svelte';
</script>

<Meta
  title="Lib / features / sku / Voucher Modal"
  component={VoucherModal}
  argTypes={{
    voucherCode: {
      control: { type: 'text' },
    },
  }}
/>

<Template let:args>
  <div class="max-w-lg">
    <VoucherModal {...args} />
  </div>
</Template>

<Story name="Modal" args={{ voucherCode: '' }} />
