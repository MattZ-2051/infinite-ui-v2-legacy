<script lang="ts">
  import { links } from '$scope/social-links';
  import Icon from '$ui/icon/Icon.svelte';

  export let size = 1.33;
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
