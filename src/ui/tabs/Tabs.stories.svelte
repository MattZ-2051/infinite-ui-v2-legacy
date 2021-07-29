<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { mdiAccount } from '@mdi/js';
  import Tabs from './Tabs.svelte';
  import Tab from './Tab.svelte';
</script>

<Meta
  title="UI / Tabs"
  component={Tabs}
  subcomponents={{ Tab }}
  argTypes={{
    selectedTabId: {
      control: { type: 'text' },
    },
    itemClass: {
      control: { type: 'text' },
    },
  }}
/>

<Template let:args>
  <Tabs {...args}>
    <Tab id="1" title="Home">Content 1</Tab>
    <Tab id="2" title="Profile" icon={mdiAccount}>Content 2</Tab>
    <Tab id="3" title="Contact">Content 3</Tab>
  </Tabs>
</Template>

<Story name="Default" />
