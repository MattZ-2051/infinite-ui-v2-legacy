<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import SkuDescription from '$project/sku-item/SkuDescription.svelte';
  import routes from '$project/routes';

  export let talent: Profile;
</script>

<div class="flex flex-col gap-4">
  <div class="relative">
    <a sveltekit:prefetch href={routes.collection(talent.username)}>
      <img src={talent.profilePhotoUrl} alt="" class="w-full object-cover" style="aspect-ratio: 1/1;" />
    </a>
    <SkuDescription issuer={talent} hideTalentImage />
  </div>
  <TalentLink profile={talent} hideImage />
</div>
