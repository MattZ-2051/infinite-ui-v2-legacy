<script lang="ts">
  export let profile: { username: string };
  export let prefix: string = undefined;
</script>

{#if profile?.username}
  {#if prefix || $$slots.prefix}
    <slot name="prefix">{prefix}</slot>
  {/if}
  <a class="font-semibold underline hover:no-underline" href="/collection/{profile.username}">@{profile.username}</a>
{/if}
