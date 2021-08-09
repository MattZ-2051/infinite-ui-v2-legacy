<script lang="ts">
  import Tabs from '../Tabs.svelte';
  import Tab from '../Tab.svelte';
</script>

<Tabs
  items={[
    { id: '1', title: 'Home' },
    { id: '2', title: 'Profile' },
    { id: '3', title: 'Contact' },
  ]}
  on:select
  {...$$props}
>
  <Tab id="1">Content 1</Tab>
  <Tab id="2">Content 2</Tab>
  <Tab id="3">Content 3</Tab>
</Tabs>
