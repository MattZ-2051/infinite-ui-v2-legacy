<script lang="ts">
  import Toast from './Toast.svelte';
  import toast from './toast.store';

  function handleOnClose({ detail }: CustomEvent<string>) {
    toast.remove(detail);
  }
</script>

<div class="flex flex-col" {...$$restProps}>
  {#each $toast as { key, ...rest } (key)}
    <Toast on:close={handleOnClose} {...rest} />
  {/each}
</div>
