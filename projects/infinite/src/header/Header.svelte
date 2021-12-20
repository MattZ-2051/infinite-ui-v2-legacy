<script lang="ts">
  import { user } from '$lib/user';
  import { links } from '$project/header/main-links';
  import PureHeader from './PureHeader.svelte';
</script>

<PureHeader user={$user} {links} />
