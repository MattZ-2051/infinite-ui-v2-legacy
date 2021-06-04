<script>
  import UserHeader from '$lib/profile/UserHeader.svelte';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
</script>

<UserHeader />

<div class="container mt-8 lg:mt-12">
  <Tabs class="text-xl md:text-2xl font-light" itemClass={'pb-4 md:pb-8'}>
    <Tab title="My Releases"><div><SkuItemGrid class="mt-4" /></div></Tab>
    <Tab title="Items">Tab 2!!!!!</Tab>
    <!-- <div slot="extra">extra data!!!</div> -->
  </Tabs>
</div>
