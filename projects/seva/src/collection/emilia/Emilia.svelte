<script lang="ts">
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import EmiliaAbout from './EmiliaAbout.svelte';
  import EmiliaFirstNft from './EmiliaFirstNft.svelte';
  import Subscribe from '../../commonComponents/Subscribe.svelte';
  import Mission from '../../landing/mission-section/Mission.svelte';

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

  export let skus;
</script>

<ThemeContext id="issuer">
  <EmiliaFirstNft sku={skus[1]} />
  <div class="container">
    <slot />
  </div>
  <div class="h-52" />
  <EmiliaAbout />
  <Mission />
  <div class="w-full flex justify-center -mt-28 px-6">
    <Subscribe />
  </div>
</ThemeContext>
