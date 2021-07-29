<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';
</script>

<Meta
  title="Lib / components / Button"
  component={Button}
  argTypes={{
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
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

<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story name="Tertiary" args={{ variant: 'tertiary' }} />
