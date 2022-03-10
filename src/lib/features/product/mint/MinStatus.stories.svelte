<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import MintStatus from './MintStatus.svelte';

  const txHash = '0xda67e2b1d3995d483be2de5dfcf944a056d2d9f2c05a3ff59cae55da1eb2b58b';
</script>

<Meta
  title="Lib / components / Mint Status"
  component={MintStatus}
  parameters={{ themes: ['light', 'dark'] }}
  argTypes={{
    txStatus: {
      options: ['pending', 'confirmed', 'error'],
      control: { type: 'select' },
    },
    txHash: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
  }}
/>

<Template let:args>
  <div class="max-w-3xl p-20">
    <MintStatus {...args} />
  </div>
</Template>

<!-- Scenario where the tx status is "pending" -->
<Story name="Pending" args={{ name: 'My NFT #HODL', txStatus: 'pending', txHash }} />
<!-- Scenario where the tx status is "confirmed" -->
<Story name="Confirmed" args={{ name: 'My NFT #HODL', txStatus: 'confirmed', txHash }} />
<!-- Scenario where the tx status is "error" -->
<Story name="Error" args={{ name: 'My NFT #HODL', txStatus: 'error', txHash }} />
