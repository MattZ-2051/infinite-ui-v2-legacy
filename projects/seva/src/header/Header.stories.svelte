<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import { user, userWithProfilePhoto } from '$mocks/resolvers/user/data';
  import { links } from './main-links';
  import PureHeader from './PureHeader.svelte';
</script>

<Meta
  title="UI / lib / Layout / Header"
  component={PureHeader}
  parameters={{
    chromatic: { viewports: [640, 1024] },
  }}
/>

<Story name="Logged out">
  <PureHeader {links} user={undefined} />
</Story>

<Story name="Logged in">
  <PureHeader {links} {user} />
  <PureHeader {links} user={userWithProfilePhoto} />
</Story>
