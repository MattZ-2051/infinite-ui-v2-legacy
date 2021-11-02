<script lang="ts">
  import { user } from '$lib/user';
  import PureHeader from './PureHeader.svelte';
  import { links } from './main-links';
</script>

<PureHeader {links} user={$user} />
