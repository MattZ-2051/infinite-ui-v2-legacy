<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { mdiArrowRight } from '@mdi/js';
  import Icon from './Icon.svelte';
</script>

<Meta title="UI / Icon" component={Icon} />

<Template let:args>
  <Icon {...args} />
</Template>

<Story name="IconTooltip" args={{ path: mdiArrowRight, tooltip: 'this is a tooltip' }} />
<Story name="Icon" args={{ path: mdiArrowRight }} />
