<script lang="ts">
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  // import SkuItem from '$project/sku-item/SkuItem.svelte';
  import EmiliaAbout from './EmiliaAbout.svelte';
  import EmiliaFirstNft from './EmiliaFirstNft.svelte';
  // export let skuLandingHeadData;
  // const photos = Object.fromEntries(
  //   profile.profilePhotoUrls.map(({ position, url }) => {
  //     return [position, { url }];
  //   })
  // );
  // const textFields = Object.fromEntries(
  //   profile.profileTextFields.map(({ position, text }) => {
  //     return [position, text];
  //   })
  // );
  // const sku = skuLandingHeadData();
</script>

<ThemeContext id="issuer">
  <EmiliaFirstNft />
  <div class="container">
    <slot />
  </div>
  <EmiliaAbout />
  <div class="h-12" />
</ThemeContext>
