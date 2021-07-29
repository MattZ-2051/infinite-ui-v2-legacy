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
    defaultSelectedId: {
      control: { type: 'text' },
    },
    itemClass: {
      control: { type: 'text' },
    },
    variant: {
      options: ['default', 'inverse'],
      control: { type: 'select' },
    },
    select: {
      action: 'select',
    },
  }}
/>

<Template let:args>
  <div class={args.variant === 'inverse' ? 'bg-black text-white' : 'bg-white text-black'}>
    <Tabs {...args} on:select={action('select')}>
      <Tab id="1" title="Home">Content 1</Tab>
      <Tab id="2" title="Profile" icon={mdiAccount}>Content 2</Tab>
      <Tab id="3" title="Contact">Content 3</Tab>
    </Tabs>
  </div>
</Template>

<Story name="Default" />
<Story name="Inverse" args={{ variant: 'inverse' }} />
