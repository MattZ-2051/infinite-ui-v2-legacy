<script lang="ts">
  import { onSignIn } from '$lib/user';

  export let loggedIn: boolean;

  async function onCreate() {
    if (loggedIn) {
      // TODO: fix this when we have the actual flow in place
      // eslint-disable-next-line no-console
      console.log('issuer create button clicked');
    } else {
      await onSignIn();
    }
  }
</script>

<button class="header-link" on:click|preventDefault={onCreate}>Create</button>
