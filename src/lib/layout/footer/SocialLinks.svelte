<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';

  export let links: { id: string; path: string; href: string }[] = [];
</script>

{#each links as { id, path, href } (id)}
  <a {href}
    ><Icon {path} size={1.33} class="flex justify-center items-center px-1.5" /><span class="sr-only">{id}</span></a
  >
{/each}

<style lang="postcss">
  a {
    background-color: var(--footer-icon-bg-color);
    color: var(--footer-icon-color);
    border-radius: var(--footer-icon-border-radius);
  }

  a:hover {
    background-color: var(--footer-icon-bg-color-hover);
    color: var(--footer-icon-color-hover);
  }
</style>
