<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';
</script>

<Meta
  title="Lib / components / Button"
  component={Button}
  argTypes={{
    variant: {
      options: ['base', 'brand', 'outline-brand'],
      control: { type: 'select' },
    },
    href: {
      control: { type: 'text' },
    },
  }}
/>

<Template let:args>
  <div class="max-w-xs">
    <Button {...args}>Button</Button>
  </div>
</Template>

<Story name="Base" args={{ variant: 'base' }} />
<Story name="Brand" args={{ variant: 'brand' }} />
<Story name="Outline Brand" args={{ variant: 'outline-brand' }} />
