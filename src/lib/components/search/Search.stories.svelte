<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Search from './Search.svelte';
</script>

<Meta
  title="Lib / components / Search"
  component={Search}
  argTypes={{
    placeholder: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
  }}
/>

<Template let:args>
  <div class="max-w-5xl" style="height: min(500px, 100%);">
    <Search {...args} />
  </div>
</Template>

<Story name="Default" />
<Story name="Initial values" args={{ value: 'value', placeholder: 'New placeholder' }} />
