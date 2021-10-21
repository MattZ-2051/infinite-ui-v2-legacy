<script lang="ts">
  import { user } from '$lib/user';
  import PureHeader from './PureHeader.svelte';
</script>

<PureHeader user={$user} />
