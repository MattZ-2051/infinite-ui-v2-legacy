<script>
  import { mdiBellOutline, mdiShareVariant } from '@mdi/js';
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Icon from '$ui/icon/Icon.svelte';
  import ButtonGroup from './ButtonGroup.svelte';
</script>

<Meta title="Lib / components / ButtonGroup" component={ButtonGroup} />

<Template let:args>
  <div class="max-w-xs">
    <ButtonGroup
      class="grid grid-cols-2 divide-x divide-gray-200 border border-gray-200 rounded-md overflow-hidden"
      {...args}
    >
      <button type="button" class="flex items-center justify-center gap-2 text-center px-2 py-5 w-full h-full"
        ><Icon path={mdiBellOutline} />
        Notify Me
      </button>
      <button type="button" class="flex items-center justify-center gap-2 text-center px-2 py-5 w-full h-full"
        ><Icon path={mdiShareVariant} />Share</button
      >
    </ButtonGroup>
  </div>
</Template>

<Story name="Default" />
