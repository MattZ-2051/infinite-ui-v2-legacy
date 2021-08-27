<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import StickyColumn from './StickyColumn.svelte';
</script>

<Meta title="UI / lib / Layout / StickyColumn" component={StickyColumn} />

<Story name="Default" parameters={{ chromatic: { disableSnapshot: true } }}>
  <StickyColumn --header-height="0px">
    <div slot="onscreen-content" class="flex flex-col justify-between h-full bg-blue-900">
      on screen content with sticky panel
      <div class="h-10 bg-red-500">bottom content should always be visible if not scrolled</div>
    </div>
    <div slot="sticky-content" class="h-full bg-pink-900">sticky content</div>
    <div slot="sticky-cta" class="bg-yellow-900 h-20">
      sticky cta that becomes fixed when viewport width is less than 768px
    </div>
    <div slot="tabs" class="h-60 bg-pink-200">tabs</div>
    <div slot="offscreen-content" style="height: 200vh" class="bg-green-900">
      off screen content without sticky panel
    </div>
  </StickyColumn>
</Story>
