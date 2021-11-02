<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from '$lib/layout/header/types';
  import { HeaderLayout } from '$lib/layout/header';
  import Icon from '$ui/icon/Icon.svelte';
  import questionMark from '$lib/components/icons/question-mark';
  import { CLIENT_SUPPORT_URL } from '$project/variables';

  export let user: User;
  export let links: Link[];
</script>

<HeaderLayout {links} {user}>
  <a let:klass let:size slot="support" href={CLIENT_SUPPORT_URL} target="_blank" rel="noreferrer" class={klass}
    ><Icon path={questionMark} {size} /></a
  >
</HeaderLayout>
