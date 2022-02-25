<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import DualRingLoader from './DualRingLoader.svelte';
</script>

<Meta title="Lib / components / DualRingLoader" component={DualRingLoader} />

<Template let:args>
  <DualRingLoader {...args} />
</Template>

<Story name="Default" args={{ class: 'mb-1' }} />
