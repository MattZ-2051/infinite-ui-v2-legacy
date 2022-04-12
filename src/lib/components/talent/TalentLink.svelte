<script lang="ts">
  import imageError from '$util/imageError';
  import routes from '$project/routes';
  import IconVerified from '$lib/components/talent/IconVerified.svelte';

  export let profile: { username: string; profilePhotoUrl: string; verified?: boolean };
  export let hideImage = false;
  export let imageClass = 'w-6 h-6';

  let _class = '';
  export { _class as class };

  const ISSUER_PAGE_ENABLED = import.meta.env?.VITE_ISSUER_PAGE_ENABLED !== 'false';
  const link = ISSUER_PAGE_ENABLED ? routes.collection(profile?.username) : routes.index;
</script>

{#if profile}
  <div class="flex items-center gap-2 whitespace-nowrap {_class || ''}" {...$$restProps}>
    {#if !hideImage && profile.profilePhotoUrl}
      <img
        class="{imageClass} rounded-full"
        src={profile.profilePhotoUrl}
        alt=""
        loading="lazy"
        use:imageError={() => (hideImage = true)}
      />
    {/if}
    <a href={link} sveltekit:prefetch class="truncate min-w-0"><slot>{profile?.username}</slot></a>
    {#if profile.verified}
      <IconVerified />
    {/if}
  </div>
{/if}
