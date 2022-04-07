<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from '$lib/layout/header/types';
  import { HeaderLayout } from '$lib/layout/header';
  import { isVisible } from '$lib/layout/header/links.utils';
  import { page } from '$app/stores';

  export let user: User;
  export let links: Link[];

  $: phase = $page.url.searchParams.get('phase') ?? '1';
  $: hideUserMenu = phase === '1' || phase === '2' ? true : isVisible(['/'], $page.url.pathname);
</script>

<HeaderLayout {links} {user} {hideUserMenu} />
