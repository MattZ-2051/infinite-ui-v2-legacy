<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { mdiBellOffOutline, mdiBellOutline, mdiShareVariant as shareIcon } from '@mdi/js';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import { Notify } from '$lib/notify';
  import { socialShareAction } from '$lib/social';
  import IconVerified from '$lib/components/talent/IconVerified.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import videoDisableOptions from '$ui/video-ext';

  export let profile: Profile;

  const photos = Object.fromEntries(
    profile.profilePhotoUrls.map(({ position, url }) => {
      return [position, { url }];
    })
  );

  const textFields = Object.fromEntries(
    profile.profileTextFields.map(({ position, text }) => {
      return [position, text];
    })
  );
</script>

<ThemeContext id="issuer">
  <div class="flex flex-col gap-14">
    <div class="flex flex-col gap-4 justify-center items-center">
      <div
        class="h-24 w-24 md:h-36 md:w-36 rounded-full bg-contain bg-center"
        style="background-image: url({profile.profilePhotoUrl})"
      />
      <div class="flex gap-2 items-center">
        <span class="text-4xl md:text-5xl text-center">{profile.firstName} {profile.lastName} </span>
        <IconVerified size={32} />
      </div>
      <div class="text-2xl">@{profile.username}</div>
      <ButtonGroup class="grid grid-cols-2 divide-x divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
        <Notify {profile} let:loading let:subscription let:notifyHandler>
          <button
            type="button"
            class="flex items-center justify-center gap-2 text-center py-3 px-5 w-full h-full"
            disabled={loading}
            on:click={notifyHandler}
            ><Icon path={subscription ? mdiBellOffOutline : mdiBellOutline} />
            {#if subscription}Unsubscribe{:else}Notify Me{/if}
          </button>
        </Notify>
        <button
          type="button"
          class="flex items-center justify-center gap-2 text-center py-3 px-5 w-full h-full"
          use:socialShareAction={{ profile }}><Icon path={shareIcon} />Share</button
        >
      </ButtonGroup>
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex md:justify-end md:mt-12 w-1/1 md:w-1/2 lg:w-7/12">
        <div class="flex flex-col gap-5">
          <h1 class="text-4xl md:text-6xl text-yellow-200 font-medium text-center md:text-left">
            {textFields[1] || ''}
          </h1>
          <div class="relative text-white text-3xl font-medium">
            <span>{textFields[2] || ''}</span>
            <img src={photos[1].url} alt="signature" class="float-right" />
          </div>

          <div class="text-gray-600 text-xl">
            {textFields[3] || ''}
          </div>
        </div>
      </div>
      <div class="px-6 w-1/1 md:w-1/2 lg:w-5/12">
        <img src={photos[2].url} alt="" />
      </div>
    </div>
    <video
      use:videoDisableOptions
      src={photos[3].url}
      playsinline
      autoplay
      loop
      muted
      controls
      style="object-fit: cover; margin:auto;"
    />
  </div>
  <slot />
  {#if photos[4].url}
    <img src={photos[4].url} alt="" class="m-auto" />
  {/if}
</ThemeContext>
