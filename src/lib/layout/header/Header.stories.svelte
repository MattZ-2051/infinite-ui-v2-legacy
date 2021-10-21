<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import PureHeader from './PureHeader.svelte';
  import { user, userWithProfilePhoto } from '../../../../mocks/resolvers/user/data';
</script>

<Meta
  title="UI / lib / Layout / Header"
  component={PureHeader}
  parameters={{
    chromatic: { viewports: [640, 1024] },
  }}
/>

<Story name="Logged out">
  <PureHeader user={undefined} />
</Story>

<Story name="Logged in">
  <PureHeader {user} />
  <PureHeader user={userWithProfilePhoto} />
</Story>
