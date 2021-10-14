<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Textarea from './Textarea.svelte';
</script>

<Meta title="Lib / components / Textarea" component={Textarea} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <div class="flex flex-col gap-6">
    <Textarea placeholder="placeholder" label="label" rows="3" {...args} />
    <Textarea class="bg-gray-50" variant="rounded" placeholder="placeholder" label="label" rows="3" {...args} />
  </div>
</Template>

<Story name="Default" />
<Story name="Error" args={{ error: 'field is required!' }} />
