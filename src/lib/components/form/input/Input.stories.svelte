<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Input from './Input.svelte';
</script>

<Meta title="Lib / components / Input" component={Input} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <div class="flex flex-col gap-6">
    <Input placeholder="placeholder" label="label" {...args} />
    <Input variant="rounded" class="bg-gray-50" placeholder="placeholder" label="label" {...args} />
  </div>
</Template>

<Story name="Default" />
<Story name="Prefix" args={{ before: '$' }} />
<Story name="Error" args={{ error: 'field is required!' }} />
