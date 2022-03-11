<script lang="ts">
  import routes from '$project/routes';

  export let username: string;
  export let prefix: string = undefined;

  let _class = '';
  export { _class as class };

  export let hasLinkClass = true;
</script>

{#if username}
  <span>
    {#if prefix || $$slots.prefix}
      <slot name="prefix">{prefix}</slot>
    {/if}
    <a
      href={routes.collection(username)}
      sveltekit:prefetch
      class:link={hasLinkClass}
      class="whitespace-nowrap {_class || ''}"
      {...$$restProps}><slot>@{username}</slot></a
    >
  </span>
{/if}

<style lang="postcss">
  a:hover {
    @apply bg-clip-text;
    color: var(--userlink-color, inherit);
    background-image: var(--userlink-bg, none);
  }
</style>
