<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import routes from '$lib/routes';

  export let issuer: Profile;
  export let description: string;
</script>

<div class="card-description absolute inset-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
  <div class="card-description-inner pt-6 pb-4 px-4 text-white h-full flex flex-col font-medium">
    <a class="flex items-center mb-4" href={routes.collection(issuer.username)}>
      {#if issuer.profilePhotoUrl}
        <img class="w-10 rounded-full" src={issuer.profilePhotoUrl} alt="" />
      {/if}
      <span class="text-primary text-2xl ml-3">{issuer.username}</span>
    </a>
    <div class="flex-1 overflow-hidden mb-4">
      <div
        class="card-description-text line-clamp-4 sm:line-clamp-9 md:line-clamp-9 lg:line-clamp-6 xl:line-clamp-5 2xl:line-clamp-9"
      >
        {description}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .card-description {
    background: rgba(255, 255, 255, 0.75);
  }
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
