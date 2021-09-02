<script lang="ts">
  import imageError from '$util/imageError';
  import routes from '$lib/routes';
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
    <a href={routes.collection(profile.username)} sveltekit:prefetch><slot>{profile.username}</slot></a>
    <IconVerified />
  </div>
{/if}
