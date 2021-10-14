<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Select from './Select.svelte';

  let selected = 'apple';
</script>

<Meta title="Lib / components / Select" component={Select} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <div class="flex flex-col gap-6">
    <Select bind:value={selected} label="label" {...args}>
      <option value="apple">Apple</option>
      <option value="orange">Orange</option>
      <option value="bannana">Bannana</option>
      <option value="mango">Mango</option>
    </Select>
    <Select bind:value={selected} class="bg-gray-50" label="label" variant="rounded" {...args}>
      <option value="apple">Apple</option>
      <option value="orange">Orange</option>
      <option value="bannana">Bannana</option>
      <option value="mango">Mango</option>
    </Select>
  </div>
</Template>

<Story name="Default" />
<Story name="Error" args={{ error: 'field is required!' }} />
