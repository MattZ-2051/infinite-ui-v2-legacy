<script lang="ts">
  import { mdiChevronLeft } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
</script>

<div class="header">
  <div class="container">
    <div class="mb-8 btmc pt-10 flex">
      <div class="flex items-center mr-1">
        <Icon path={mdiChevronLeft} size="1.125" />
      </div>
      <span class="italic">Back to my collection</span>
    </div>
    <div class="pb-9 text-white text-3xl tracking-tight"><span>My wallet</span></div>
  </div>
</div>

<style>
  .header {
    background: #101010;
  }
  .btmc {
    color: #cbcbcb;
  }
</style>
