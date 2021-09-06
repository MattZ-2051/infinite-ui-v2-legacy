<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { mdiBellOutline as notifyIcon, mdiShareVariant as shareIcon } from '@mdi/js';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { notifyAction } from '$lib/notify';
  import { socialShareAction } from '$lib/social';
  import IconVerified from '$lib/components/talent/IconVerified.svelte';
  import Icon from '$ui/icon/Icon.svelte';

  export let profile: Profile;

  const images = Object.fromEntries(
    profile.profilePhotoUrls.map((p) => {
      return [p.position, p.url];
    })
  );

  const text = Object.fromEntries(
    profile.profileTextFields.map((p) => {
      return [p.position, p.text];
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
      <div class="relative">
        <div class="grid grid-cols-2  border border-opacity-20 rounded-md overflow-hidden">
          <div class="border-r border-opacity-20">
            <button
              type="button"
              class="flex items-center justify-center gap-2 hover:bg-primary text-center py-3 px-5 w-full h-full"
              use:notifyAction={{ profile }}><Icon path={notifyIcon} />Notify Me</button
            >
          </div>
          <div class="border-r border-opacity-20">
            <button
              type="button"
              class="flex items-center justify-center gap-2 hover:bg-primary text-center py-3 px-5 w-full h-full"
              use:socialShareAction={{ profile }}><Icon path={shareIcon} />Share</button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-evenly md:flex-row">
      <div class="flex md:justify-end mt-8 flex-shrink">
        <div class="flex flex-col gap-5">
          <h1 class="text-4xl md:text-6xl text-yellow-200 font-medium text-center md:text-left md:whitespace-nowrap">
            {text[1] || ''}
          </h1>
          <div class="relative text-white text-3xl font-medium">
            <span>{text[2] || ''}</span>
            <img src={images[1]} alt="signature" class="float-right" />
          </div>

          <div class="text-white-opacity-60 text-xl">
            {text[3] || ''}
          </div>
        </div>
      </div>
      <img src={images[2]} alt="" />
    </div>
    <video src={images[3]} playsinline autoplay loop muted style="object-fit: cover; margin:auto;" />
  </div>
  <slot />
  {#if images[4]}
    <img src={images[4]} alt="" class="m-auto" />
  {/if}
</ThemeContext>
