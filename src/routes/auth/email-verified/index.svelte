<script context="module" lang="ts">
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';
  import { user, onSignIn } from '$lib/user';
</script>

<ThemeContext id="error" class="flex flex-grow items-center justify-center" display>
  <div class="container flex flex-col gap-5 md:gap-10 items-center text-center md:pt-16 md:pb-14">
    {#if $user}
      <div class="text-xl md:text-3xl font-semibold">Your email was successfully verified and you are logged in!</div>
      <div><Button variant="brand" href={routes.marketplace}>Continue to marketplace</Button></div>
    {:else}
      <div class="text-xl md:text-3xl font-semibold">Your email was successfully verified</div>
      <div><Button variant="brand" on:click={() => onSignIn()}>Sign in</Button></div>
    {/if}
  </div>
</ThemeContext>
