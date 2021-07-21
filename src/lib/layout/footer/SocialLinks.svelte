<script lang="ts">
  import { mdiTwitter, mdiYoutube, mdiInstagram, mdiLinkedin, mdiFacebook, mdiDiscord, mdiEmail } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  export let size = 1.33;

  const links = [
    {
      id: 'Youtube',
      href: 'https://www.youtube.com/channel/UCsSdn6MM2hZir_s70yO0C4w/',
      path: mdiYoutube,
    },
    {
      id: 'Facebook',
      href: 'https://www.facebook.com/The-ARIA-Network-106228618351483',
      path: mdiFacebook,
    },
    { id: 'Twitter', href: 'https://twitter.com/TheAriaNetwork', path: mdiTwitter },
    { id: 'Instagram', href: 'https://www.instagram.com/TheAriaNetwork/', path: mdiInstagram },
    { id: 'LinkedIn', href: 'https://www.linkedin.com/company/vrm-aria', path: mdiLinkedin },
    { id: 'Discord', href: 'https://discord.gg/3JtgwbduBt', path: mdiDiscord },
    { id: 'Email', href: 'mailto:support@ariaexchange.com', path: mdiEmail },
  ];
</script>

{#each links as link (link.id)}
  <a href={link.href}
    ><Icon
      path={link.path}
      {size}
      class="flex justify-center items-center px-2 rounded-xl text-white bg-gray-800 hover:bg-white hover:text-black"
    /><span class="sr-only">{link.id}</span></a
  >
{/each}
