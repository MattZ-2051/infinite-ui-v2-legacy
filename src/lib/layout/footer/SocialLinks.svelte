<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';

  export let links: { id: string; path: string | { [key: string]: string }[]; href: string }[] = [];
</script>

{#each links as { id, path, href } (id)}
  <a {href} target="_blank" rel="noopener noreferrer"
    ><Icon {path} size={1.33} class="flex justify-center items-center px-1.5" /><span class="sr-only">{id}</span></a
  >
{/each}

<style lang="postcss">
  a {
    background-color: var(--footer-icon-bg-color);
    color: var(--footer-icon-color);
    border-radius: var(--footer-icon-border-radius);
    border: var(--footer-icon-border, none);
  }

  a:hover {
    background-color: var(--footer-icon-bg-color-hover);
    color: var(--footer-icon-color-hover);
    border: var(--footer-icon-border-hover, none);
  }
</style>
