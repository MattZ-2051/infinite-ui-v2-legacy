<script lang="ts">
  import notifications from '$lib/toast/toast.store';
</script>

<h1 class="text-lg text-purple-600 font-extrabold">Marketplace</h1>

<div class="mt-60" />
<button on:click={() => notifications.info('Wait a INFO...', { closeable: false })}> info! </button>
<button on:click={() => notifications.warning('Wait a moment...')}> Warn! </button>
<button on:click={() => notifications.success('You did it!')}> Succeed! </button>
<button on:click={() => notifications.danger('STOP NOW!')}> Danger! </button>
