<script lang="ts">
  import { mdiDiscord } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
</script>

<a
  href="https://discord.gg/mandelaverse"
  target="_blank"
  rel="noopener noreferrer"
  class="text-xs flex items-center gap-2 border p-1.5 md:p-2.5 whitespace-nowrap font-light"
>
  <Icon path={mdiDiscord} size={0.9} class="flex justify-center items-center" />
  <span class="text-xs flex">MANDELAVERSE<span class="hidden md:block">DISCORD</span></span>
</a>

<style lang="postcss">
  a {
    transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out, border-color 0.4s ease-in-out;
  }
  a:hover {
    background-color: #7289da;
    color: #ffffff;
    border-color: #ffffff;
  }
</style>
