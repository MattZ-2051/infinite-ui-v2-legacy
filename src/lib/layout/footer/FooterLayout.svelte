<script lang="ts">
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
</script>

<ThemeContext id="footer">
  <footer>
    <div class="separator" />
    <div class="container flex flex-col gap-y-8 justify-evenly items-center text-sm md:flex-row md:justify-between">
      <div class="flex flex-wrap items-center justify-center gap-4 footer-gap-lg">
        <slot name="start" />
      </div>
      <div class="lg:flex-row flex flex-col items-center px-4">
        <span class="pb-4 lg:pb-0 px-4 flex flex-wrap gap-1 justify-center text-center">
          <slot name="copyright" />
        </span>
        <div class="flex flex-wrap items-center justify-center text-center gap-x-8 gap-y-4 md:gap-5">
          <slot name="end" />
        </div>
      </div>
    </div>
  </footer>
</ThemeContext>

<style lang="postcss">
  footer {
    color: var(--footer-color);
    background-color: var(--footer-bg-color);
  }
  @screen lg {
    .footer-gap-lg {
      gap: var(--footer-gap-links, 1rem);
    }
  }
</style>
