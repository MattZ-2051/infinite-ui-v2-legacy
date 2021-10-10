<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Select from './Select.svelte';
</script>

<Meta title="Lib / components / Select" component={Select} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <Select label="label" {...args}>
    <option value="apple">Apple</option>
    <option value="orange">Orange</option>
    <option value="bannana">Bannana</option>
    <option value="mango">Mango</option>
  </Select>
</Template>

<Story name="Default" />
<Story name="Error" args={{ error: 'field is required!' }} />
