<script context="module" lang="ts">
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';
  import { user, onSignIn } from '$lib/user';
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';

  const EXPIRED_LINK_MESSAGE = 'Access expired.';
  const USER_EMAIL_PARAMETER = 'user_email';

  $: success = $page.url.searchParams.get('success') === 'true';
  $: message = $page.url.searchParams.get('message');

  $: if (browser && !success && message === EXPIRED_LINK_MESSAGE) {
    // a fragment with the user's email is appended to the verification link url in auth0 email template message
    const fragmentParameters = new URLSearchParams($page.url.hash.slice(1));
    const userEmail = fragmentParameters.get(USER_EMAIL_PARAMETER);

    goto(`${routes.verficationEmail(userEmail)}?expired_link=true`);
  }
</script>

<ThemeContext id="error" class="flex flex-grow items-center justify-center" display>
  <div class="container flex flex-col gap-5 md:gap-10 items-center text-center md:pt-16 md:pb-14">
    {#if $user}
      <div class="text-xl md:text-3xl font-semibold">Your email was successfully verified and you are logged in!</div>
      <div><Button variant="brand" href={routes.marketplace}>Continue to marketplace</Button></div>
    {:else if success}
      <div class="text-xl md:text-3xl font-semibold">Your email was successfully verified</div>
      <div><Button variant="brand" on:click={() => onSignIn()}>Sign in</Button></div>
    {/if}
  </div>
</ThemeContext>
