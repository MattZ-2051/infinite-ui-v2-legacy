<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import Footer from './Footer.svelte';
</script>

<Meta
  title="UI / lib / Layout / Footer"
  component={Footer}
  parameters={{
    chromatic: { viewports: [640, 1024] },
  }}
/>

<Story name="Default">
  <Footer />
</Story>
