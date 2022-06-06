<script lang="ts">
  import { mdiDiscord } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { MP_JOIN_DISCORD, MP_DISCORD_LINK } from '$project/variables';
</script>

<a
  href={MP_DISCORD_LINK}
  target="_blank"
  rel="noopener noreferrer"
  class="text-xs flex items-center gap-3 border p-1.5 md:p-2.5 whitespace-nowrap font-light"
>
  <Icon path={mdiDiscord} size={0.9} class="flex justify-center items-center" />
  <span class="text-xs uppercase flex gap-1">{MP_JOIN_DISCORD} <span>DISCORD</span></span>
</a>

<style lang="postcss">
  a {
    background-color: var(--mp-join-discord-bg);
    border: none;
    border-radius: 6px;
    color: var(--mp-join-discord-text);
    padding: 14px 22px;
    transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out, border-color 0.4s ease-in-out;
  }
  a:hover {
    background-color: var(--mp-join-discord-hover-color);
  }
</style>
