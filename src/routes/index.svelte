<script lang="ts">
  import { Tabs, Tab, TabsVariantDark } from '$ui/tabs';
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a class="text-red-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
  documentation
</p>

<div class="container">
  <Tabs>
    <Tab title="Assigned Tasks">Tab 1!!!!!</Tab>
    <Tab title="Short">Tab 2!!!!!</Tab>
    <div slot="extra">extra data!!!</div>
  </Tabs>
</div>

<div class="container py-8 mt-2 bg-black text-white">
  <TabsVariantDark>
    <Tabs>
      <Tab title="Assigned Tasks">Tab 1!!!!!</Tab>
      <Tab title="Short">Tab 2!!!!!</Tab>
      <div slot="extra">extra data!!!</div>
    </Tabs>
  </TabsVariantDark>
</div>

<style>
  h1 {
    @apply text-lg;
    @apply font-extrabold;
    color: theme('colors.purple.500');
  }
</style>
