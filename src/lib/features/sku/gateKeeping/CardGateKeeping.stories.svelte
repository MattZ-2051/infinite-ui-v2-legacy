<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import CardGateKeeping from './CardGateKeeping.svelte';

  const sourceImg =
    'https://static01.nyt.com/images/2015/09/20/magazine/20abduljabbar1/20mag-20abdul-jabbar-t_CA0-facebookJumbo.jpg';
</script>

<Meta title="Lib / features / Sku / gateKeeping " component={CardGateKeeping} />

<Template let:args>
  <div class="max-w-5xl" style="height: min(500px, 100%);">
    <CardGateKeeping {...args} {sourceImg} />
  </div>
</Template>

<Story name="Gate Keeping Item" />
