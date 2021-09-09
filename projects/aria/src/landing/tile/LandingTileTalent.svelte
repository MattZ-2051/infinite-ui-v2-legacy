<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuDescription from '$project/sku-item/SkuDescription.svelte';

  export let talent: Profile;

  let photoUrl: string;
  $: photoUrl = talent.profilePhotoUrls?.find(({ position }) => position === '2')?.url;
</script>

<div class="flex flex-col gap-4">
  <div class="relative">
    <img src={photoUrl} alt="" class="w-full object-cover" style="aspect-ratio: 1/1;" />
    <SkuDescription issuer={talent} />
  </div>
  <TalentLink profile={talent} />
</div>
