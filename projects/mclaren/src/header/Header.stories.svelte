<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import { user, userWithProfilePhoto } from '$mocks/resolvers/user/data';
  import { links } from '$project/header/main-links';
  import PureHeader from './PureHeader.svelte';

  const phase1 = '1';
  const phase3 = '3';
  const connectWallet = true;
</script>

<Meta
  title="UI / lib / Layout / Header"
  component={PureHeader}
  parameters={{
    chromatic: { viewports: [640, 1024] },
  }}
/>

<Story name="Logged out">
  <PureHeader links={links(phase1, connectWallet)} user={undefined} />
  <PureHeader links={links(phase3, connectWallet)} user={undefined} />
</Story>

<Story name="Logged in">
  <PureHeader links={links(phase1, connectWallet)} {user} />
  <PureHeader links={links(phase1, connectWallet)} user={userWithProfilePhoto} />
  <PureHeader links={links(phase3, connectWallet)} {user} />
  <PureHeader links={links(phase3, !connectWallet)} user={userWithProfilePhoto} />
</Story>
