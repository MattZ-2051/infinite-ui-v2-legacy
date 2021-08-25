<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import SubscribeForm from './SubscribeForm.svelte';
</script>

<Meta title="Aria / components / SubscribeForm" component={SubscribeForm} />

<Template let:args>
  <SubscribeForm {...args} />
</Template>

<Story name="Default" />
