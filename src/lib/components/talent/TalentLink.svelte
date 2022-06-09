<script lang="ts">
  import imageError from '$util/imageError';
  import routes from '$project/routes';
  import { variables } from '$lib/variables';
  import IconVerified from '$lib/components/talent/IconVerified.svelte';

  export let profile: { username: string; profilePhotoUrl: string; verified?: boolean };
  export let hideImage = false;
  export let imageClass = 'w-6 h-6';
  export let applyLink = true;

  let _class = '';
  export { _class as class };

  const ISSUER_PAGE_ENABLED = variables.issuerPageEnabled;
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
        data-testid="talentlink-profile-photo"
        use:imageError={() => (hideImage = true)}
      />
    {/if}
    {#if applyLink}
      <a href={link} sveltekit:prefetch class="truncate min-w-0"><slot>{profile.username}</slot></a>
    {:else}
      <slot>{profile.username}</slot>
    {/if}
    {#if profile.verified}
      <IconVerified />
    {/if}
  </div>
{/if}
