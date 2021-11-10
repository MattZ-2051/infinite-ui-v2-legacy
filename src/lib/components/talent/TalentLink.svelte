<script lang="ts">
  import imageError from '$util/imageError';
  import routes from '$project/routes';
  import IconVerified from './IconVerified.svelte';

  export let profile: { username: string; profilePhotoUrl: string; verified?: boolean };
  export let hideImage = false;
  export let imageClass = 'w-6 h-6';

  let _class = '';
  export { _class as class };
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
    <a href={routes.collection(profile.username)} sveltekit:prefetch class="truncate min-w-0"
      ><slot>{profile.username}</slot></a
    >
    {#if profile.verified}
      <IconVerified />
    {/if}
  </div>
{/if}
