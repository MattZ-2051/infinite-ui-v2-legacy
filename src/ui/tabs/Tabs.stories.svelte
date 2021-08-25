<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { action } from '@storybook/addon-actions';
  import { mdiAccount } from '@mdi/js';
  import Tabs from './Tabs.svelte';
  import Tab from './Tab.svelte';
</script>

<Meta
  title="UI / Tabs"
  component={Tabs}
  subcomponents={{ Tab }}
  argTypes={{
    items: {
      control: { type: 'array' },
      defaultValue: [
        { id: '1', title: 'Home' },
        { id: '2', title: 'Profile', icon: mdiAccount },
        { id: '3', title: 'Contact' },
      ],
    },
    defaultSelectedId: {
      control: { type: 'text' },
    },
    menuBreakpoint: {
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
      defaultValue: 'md',
    },
    select: {
      action: 'select',
    },
  }}
/>

<Template let:args>
  <Tabs {...args} on:select={action('select')}>
    <Tab id="1">Content 1</Tab>
    <Tab id="2">Content 2</Tab>
    <Tab id="3">Content 3</Tab>
  </Tabs>
</Template>

<Story name="Default" />
