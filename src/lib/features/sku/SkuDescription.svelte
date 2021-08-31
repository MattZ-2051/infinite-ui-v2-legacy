<script lang="ts">
  import xss from 'xss';

  export let content = '';
</script>

<div class="description text-white-opacity-70">
  {@html xss(content || '')}
</div>

<style lang="postcss">
  .description :global(h3) {
    @apply text-2xl;
    @apply text-default;
  }
  .description :global(p) {
    @apply my-4;
  }
  .description :global(ul) {
    @apply my-4;
    @apply list-disc;
    @apply pl-5;
  }
  .description :global(a) {
    @apply underline;
    color: var(--link-color);
  }
</style>
