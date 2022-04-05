<script lang="ts">
  import Cookies from '$lib/features/cookies/Cookies.svelte';
  import { CLIENT_COMPANY_NAME, COOKIE_URL } from '$project/variables';
</script>

<Cookies name={CLIENT_COMPANY_NAME} url={COOKIE_URL} />
