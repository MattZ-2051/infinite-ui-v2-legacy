<script lang="ts">
  import Toast from './Toast.svelte';
  import toast from './toast.store';

  function handleOnClose({ detail }: CustomEvent<string>) {
    toast.remove(detail);
  }
</script>

<div class="flex flex-col" {...$$restProps}>
  {#each $toast as { key, ...rest } (key)}
    <Toast
      on:close={handleOnClose}
      {...rest}
      let:severity
      let:message
      let:onMessageClick
      let:closeable
      let:close
      let:showProgressBar
      let:progress
    >
      <slot {severity} {message} {onMessageClick} {closeable} {close} {showProgressBar} {progress} />
    </Toast>
  {/each}
</div>
