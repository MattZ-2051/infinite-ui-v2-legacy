<script lang="ts">
  import Tabs from '../Tabs.svelte';
  import Tab from '../Tab.svelte';
</script>

<Tabs on:select {...$$props}>
  <Tab id="1" title="Home">Content 1</Tab>
  <Tab id="2" title="Profile">Content 2</Tab>
  <Tab id="3" title="Contact">Content 3</Tab>
</Tabs>
