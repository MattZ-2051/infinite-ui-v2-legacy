<script>
  import { onMount } from 'svelte';
  import { passwordChangeRequested } from '$lib/features/changePassword/changePassword.store';

  onMount(async () => {
    passwordChangeRequested();
  });
</script>
