<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import FullScreenLoader from './FullScreenLoader.svelte';
</script>

<Meta title="Lib / components / FullScreenLoader" component={FullScreenLoader} />

<Template let:args>
  <FullScreenLoader {...args} />
</Template>

<Story name="Default" args={{ class: 'mb-1' }} />
