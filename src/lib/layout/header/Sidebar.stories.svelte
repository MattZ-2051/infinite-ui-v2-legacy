<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import Sidebar from './Sidebar.svelte';
  import { user } from '../../../../mocks/resolvers/user/data';
</script>

<Meta title="UI / lib / Layout / Sidebar" component={Sidebar} />

<Story name="Logged out">
  <Sidebar user={undefined} />
</Story>

<Story name="Logged in">
  <Sidebar {user} />
</Story>
