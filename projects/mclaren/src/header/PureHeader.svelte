<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from '$lib/layout/header/types';
  import { HeaderLayout } from '$lib/layout/header';
  import { isVisible } from '$lib/layout/header/links.utils';
  import { page } from '$app/stores';

  export let user: User;
  export let links: Link[];

  const CURRENT_PHASE = import.meta.env.VITE_CURRENT_PHASE;

  $: phase = CURRENT_PHASE ?? '1';
  const isVisiblePathRegExp = /^\/((collections)|(collection)|(marketplace)|(checkout)|(collectors)|(product))\/.*$/;
  $: hideUserMenu =
    phase === '1' || phase === '2'
      ? true
      : isVisible(['/', '/u/account', '/u/wallet'], $page.url.pathname) &&
        !isVisiblePathRegExp.test($page.url.pathname);
</script>

<HeaderLayout {links} {user} {hideUserMenu} />
