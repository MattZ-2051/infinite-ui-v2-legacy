<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
  import { user } from '$mocks/resolvers/user/data';
  import { links } from '$project/header/main-links';
  import Sidebar from './Sidebar.svelte';
</script>

<Meta title="UI / lib / Layout / Sidebar" component={Sidebar} />

<Template let:args>
  <Sidebar {links} {...args} />
</Template>

<Story name="Logged out" args={{ user: undefined }} />
<Story name="Logged in" args={{ user }} />
