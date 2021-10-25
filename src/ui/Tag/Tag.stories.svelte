<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Tag from './Tag.svelte';
</script>

<Meta title="UI / Tag" component={Tag} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <Tag {...args}>Tag</Tag>
</Template>

<Story name="Default" />
