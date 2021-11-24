<script lang="ts">
  import type { Profile, Sku } from '$lib/sku-item/types';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import EmiliaAbout from './EmiliaAbout.svelte';
  import EmiliaFirstNft from './EmiliaFirstNft.svelte';
  import Subscribe from '../../commonComponents/Subscribe.svelte';
  import Mission from '../../landing/mission-section/Mission.svelte';

  export let profile: Profile;
  export let featuredSku: Sku;

  const photos = profile.profilePhotoUrls
    ? Object.fromEntries(
        profile.profilePhotoUrls?.map(({ position, url }) => {
          return [position, { url }];
        })
      )
    : [];

  const textFields = profile.profileTextFields
    ? Object.fromEntries(
        profile.profileTextFields?.map(({ position, text }) => {
          return [position, text];
        })
      )
    : [];
</script>

<ThemeContext id="issuer">
  <EmiliaFirstNft
    sku={featuredSku}
    title1={textFields[1]}
    title2={textFields[2]}
    title3={textFields[3]}
    photo={photos[1].url}
  />
  <div class="container" id="collection">
    <slot />
  </div>
  <div class="h-52" />
  <EmiliaAbout
    title1={textFields[5]}
    title2={textFields[6]}
    title3={textFields[7]}
    photo={photos[2].url}
    link={textFields[8]}
  />
  <Mission />
  <div class="w-full flex justify-center -mt-28 px-6">
    <Subscribe />
  </div>
</ThemeContext>
