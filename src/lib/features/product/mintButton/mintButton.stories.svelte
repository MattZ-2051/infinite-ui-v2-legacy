<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import MintButton from './mintButton.svelte';
</script>

<Meta
  title="Lib / features / Mint button / MintButton"
  component={MintButton}
  argTypes={{
    status: {
      options: ['processing', 'processed', 'toMint'],
      control: { type: 'select' },
    },
  }}
/>

<Template let:args>
  <div class="max-w-5xl" style="height: min(500px, 100%);">
    <MintButton {...args} />
  </div>
</Template>

<Story name="Button Mint Status" />
