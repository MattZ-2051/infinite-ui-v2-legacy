<script lang="ts">
  import { page } from '$app/stores';
  import VerificationEmail from '$lib/components/verificationEmail/verificationEmail.svelte';

  const { email } = $page.params;
</script>

<VerificationEmail {email} />
