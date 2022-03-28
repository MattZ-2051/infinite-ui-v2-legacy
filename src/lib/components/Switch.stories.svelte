<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Switch from './Switch.svelte';
</script>

<Meta
  title="Lib / components / Switch"
  component={Switch}
  parameters={{ themes: ['light', 'dark'] }}
  argTypes={{
    checked: {
      control: { type: 'boolean' },
    },
  }}
/>

<Template let:args>
  <Switch {...args} />
</Template>

<Story name="Checked" args={{ checked: true }} />
<Story name="Unchecked" args={{ checked: false }} />
