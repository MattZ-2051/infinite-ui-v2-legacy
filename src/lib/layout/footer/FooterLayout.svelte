<script lang="ts">
  import ThemeContext from '$lib/theme/ThemeContext.svelte';

  export let useContainer = true;
</script>

<ThemeContext id="footer">
  <footer class="w-full">
    <div class="footer-separator">
      <div class="separator" />
    </div>
    <div
      class="flex flex-col gap-y-8 justify-evenly items-center text-sm md:flex-row md:justify-between footer-container"
      class:container={useContainer}
    >
      <div class="flex flex-wrap items-center justify-center gap-4 footer-links">
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
  .footer-container {
    min-height: var(--footer-min-height, 0);
    margin-top: var(--footer-margin-top-mobile);
    align-items: var(--footer-align-links-mobile, center);
  }

  @screen md {
    .footer-container {
      margin-top: 0;
      align-items: center;
    }
  }

  .footer-links {
    justify-content: var(--footer-justify-links-mobile, center);
  }

  @screen md {
    .footer-links {
      gap: var(--footer-gap-links, 1rem);
    }
  }
</style>
