<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import hedera from '$lib/components/icons/hedera';

  export let tokenId: string;
  export let explorerLink: string = undefined;
</script>

{#if tokenId}
  <a class="link flex items-center gap-1" href={explorerLink}><Icon path={hedera} size="0.6" /> Token {tokenId}</a>
{/if}
