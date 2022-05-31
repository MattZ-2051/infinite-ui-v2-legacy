<script lang="ts">
  import { SocialLinks } from '$lib/layout/footer';
  import Logo from '$project/assets/Logo.svelte';
  import { links } from '$project/social/social-links';
  import Discord from '$project/social/Discord.svelte';
</script>

<header>
  <div class="bg-default">
    <div class="container flex justify-between">
      <div class="flex items-center text-black"><Logo /></div>
      <div class="flex gap-2 lg:gap-6 items-center text-black">
        <div class="text-xs text-right hidden sm:block">
          <div>Connect Wallet</div>
        </div>
        <Discord />
        <div class="flex items-center gap-2 justify-end">
          <SocialLinks links={links.filter(({ id }) => id !== 'Facebook')} />
        </div>
      </div>
    </div>
  </div>
</header>
