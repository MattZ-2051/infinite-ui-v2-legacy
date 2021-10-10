<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Input from './Input.svelte';
</script>

<Meta title="Lib / components / Input" component={Input} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <Input placeholder="placeholder" label="label" {...args} />
</Template>

<Story name="Default" />
<Story name="Error" args={{ error: 'field is required!' }} />
