<script lang="ts">
  export let themes: string[] = [];
</script>

<div class="flex">
  {#if themes.length > 0}
    {#each themes as theme}
      <div
        style={`width: ${100 / themes.length}%`}
        class="min-h-screen overflow-hidden p-4 theme-{theme}"
        data-theme-context="root"
      >
        <slot />
      </div>
    {/each}
  {:else}
    <div class="min-h-screen overflow-hidden p-4 w-full" data-theme-context="root">
      <slot />
    </div>
  {/if}
</div>
