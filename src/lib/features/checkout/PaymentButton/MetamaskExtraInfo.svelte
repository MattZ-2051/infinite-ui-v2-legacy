<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import information from '$lib/components/icons/information';
</script>

<div class="flex flex-row items-center gap-2 text-xs text-default">
  Pay through MetaMask Platform
  <div class="rounded-full text-default border-2 w-min p-[1px] theme-styles">
    <Icon path={information} size={0.4} />
  </div>
</div>

<style>
  div {
    border-color: var(--default-color);
  }
</style>
