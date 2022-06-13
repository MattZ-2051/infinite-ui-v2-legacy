<script lang="ts">
  import { page } from '$app/stores';
  import VerificationEmail from '$lib/components/verificationEmail/verificationEmail.svelte';

  const { email } = $page.params;
  const expiredLink = $page.url.searchParams.get('expired_link') === 'true';
</script>

<VerificationEmail {email} {expiredLink} />
