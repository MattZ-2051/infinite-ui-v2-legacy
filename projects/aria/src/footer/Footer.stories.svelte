<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import { user } from '$mocks/resolvers/user/data';
  import PureFooter from './PureFooter.svelte';
</script>

<Meta
  title="UI / lib / Layout / Footer"
  component={PureFooter}
  parameters={{
    chromatic: { viewports: [640, 1024] },
  }}
/>

<Story name="Logged out">
  <PureFooter user={undefined} />
</Story>

<Story name="Logged in">
  <PureFooter {user} />
</Story>
