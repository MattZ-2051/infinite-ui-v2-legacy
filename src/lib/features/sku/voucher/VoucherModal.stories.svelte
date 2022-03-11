<script lang="ts">
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import VoucherModal from './VoucherModal.svelte';
</script>

<Meta
  title="Lib / features / sku / Voucher Modal"
  component={VoucherModal}
  argTypes={{
    isValidCode: {
      options: [undefined, true, false],
      control: { type: 'select' },
    },
    voucherCode: {
      control: { type: 'text' },
    },
  }}
/>

<Template let:args>
  <div class="max-w-5xl">
    <VoucherModal {...args} />
  </div>
</Template>

<Story name="Modal" args={{ isValidCode: undefined, voucherCode: '' }} />
