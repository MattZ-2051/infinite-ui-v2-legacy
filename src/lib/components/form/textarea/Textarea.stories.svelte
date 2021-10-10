<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Textarea from './Textarea.svelte';
</script>

<Meta title="Lib / components / Textarea" component={Textarea} parameters={{ themes: ['light', 'dark'] }} />

<Template let:args>
  <Textarea placeholder="placeholder" label="label" rows="4" {...args} />
</Template>

<Story name="Default" />
<Story name="Error" args={{ error: 'field is required!' }} />
