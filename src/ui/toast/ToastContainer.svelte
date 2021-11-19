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
      let:classes
    >
      <slot {severity} {message} {onMessageClick} {closeable} {close} {showProgressBar} {progress} {classes} />
    </Toast>
  {/each}
</div>
