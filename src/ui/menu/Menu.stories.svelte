<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import { mdiAccountCircleOutline, mdiChevronDown, mdiCreditCardOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import MenuList from './MenuList.svelte';
  import MenuItem from './MenuItem.svelte';
  import MenuTrigger from './MenuTrigger.svelte';
  import Menu from './Menu.svelte';

  let selected = 'action-1';
</script>

<Meta
  title="UI / Menu"
  component={Menu}
  subcomponents={{ MenuTrigger, MenuList, MenuItem }}
  parameters={{ themes: ['light', 'dark'] }}
  argTypes={{
    visible: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    placement: {
      control: { type: 'text' },
      defaultValue: 'bottom',
    },
    offset: {
      control: { type: 'number' },
      defaultValue: 4,
    },
  }}
/>

<Story name="Default" let:args>
  <div class="flex justify-center">
    <Menu {...args}>
      <MenuTrigger slot="trigger" class="text-gray-500"
        >Menu Button
        <Icon path={mdiChevronDown} class="inline ml-3" />
      </MenuTrigger>
      <MenuList slot="menu">
        <MenuItem selected={selected === 'action-1'} on:select={() => (selected = 'action-1')}>Action 1</MenuItem>
        <MenuItem selected={selected === 'action-2'} on:select={() => (selected = 'action-2')}>Action 2</MenuItem>
        <MenuItem selected={selected === 'action-3'} on:select={() => (selected = 'action-3')}>Action 3</MenuItem>
      </MenuList>
    </Menu>
  </div>
</Story>

<Story name="List">
  <MenuList>
    <MenuItem selected={selected === 'action-1'} on:select={() => (selected = 'action-1')}>Action 1</MenuItem>
    <MenuItem selected={selected === 'action-2'} on:select={() => (selected = 'action-2')}>
      Action 2
      <Icon path={mdiCreditCardOutline} class="inline ml-3" />
    </MenuItem>
    <MenuItem href="/">Link</MenuItem>
    <MenuItem disabled>
      Disabled
      <Icon path={mdiAccountCircleOutline} class="inline ml-3" />
    </MenuItem>
  </MenuList>
</Story>
