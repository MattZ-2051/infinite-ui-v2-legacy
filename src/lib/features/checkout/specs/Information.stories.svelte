<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Information from '../Information.svelte';

  const conversionRate = 3006.1023;
</script>

<Meta title="Lib / Checkout / Information" component={Information} />

<Template let:args>
  <div class="bg-white max-w-3xl p-20">
    <Information {...args} />
  </div>
</Template>

<Story name="Default" args={{ conversionRate }} />
