<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from '$lib/layout/header/types';
  import PoweredByInfinite from '$project/PoweredByInfiniteLogo.svelte';
  import { HeaderLayout } from '$lib/layout/header';

  export let user: User;
  export let links: Link[];
</script>

<HeaderLayout {links} {user}>
  <a href="https://infiniteworld.com" slot="credits">
    <PoweredByInfinite />
  </a>
</HeaderLayout>
