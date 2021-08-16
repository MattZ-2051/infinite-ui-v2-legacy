<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { mdiAccountCircleOutline, mdiChevronDown, mdiCreditCardOutline } from '@mdi/js';
  import { ThemeDecorator } from '$storybook/decorators';
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
  decorators={[() => ThemeDecorator]}
  subcomponents={{ MenuTrigger, MenuList, MenuItem }}
  argTypes={{
    visible: {
      control: { type: 'boolean' },
      defaultValue: true,
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

<Template let:args>
  <div class="flex justify-center">
    <Menu {...args}>
      <MenuTrigger slot="trigger" class="text-gray-500"
        >Menu Button
        <Icon path={mdiChevronDown} class="inline ml-3" />
      </MenuTrigger>
      <MenuList slot="menu">
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
    </Menu>
  </div>
</Template>

<Story name="Default" />
