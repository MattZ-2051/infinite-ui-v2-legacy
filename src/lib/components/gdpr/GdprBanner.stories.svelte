<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import GdprBanner from './GdprBanner.svelte';
</script>

<Meta title="Lib / components / GdprBanner" component={GdprBanner} />

<Template>
  <div id="gdpr-banner" class="absolute top-10 h-40 w-10/12">
    <GdprBanner />
  </div>
</Template>

<Story name="Default" />

<style>
  :global(#gdpr-banner article) {
    position: absolute;
  }
</style>
