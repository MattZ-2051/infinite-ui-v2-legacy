<script lang="ts">
  import Toast from '../Toast.svelte';

  export let values;
</script>

<Toast {...values} let:message let:onMessageClick let:closeable let:close let:showProgressBar let:progress>
  <div on:click={onMessageClick}>{@html message}</div>
  {#if closeable}
    <button type="button" on:click={close} title="Close" />
  {/if}

  {#if showProgressBar}
    <div role="progressbar" aria-label="notification timer" style="width: {progress * 100}%" />
  {/if}
</Toast>
