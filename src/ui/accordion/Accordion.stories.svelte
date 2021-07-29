<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Accordion from './Accordion.svelte';

  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
</script>

<Meta title="UI / Accordion" component={Accordion} />

<Template let:args>
  <Accordion {...args}>{content}</Accordion>
  <Accordion title="Title 2">{content}</Accordion>
  <Accordion title="Title 3">{content}</Accordion>
</Template>

<Story name="Default" args={{ title: 'Title 1', open: true }} />
