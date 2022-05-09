<script lang="ts">
  import { CLIENT_COMPANY_NAME } from '$project/variables';
  import InfiniteWorldPrivacy from '$project/terms/InfiniteWorldPrivacy.svelte';
  import AriaPrivacy from './AriaPrivacy.svelte';

  const shortName = CLIENT_COMPANY_NAME.split(' ')[0].split('.')[0];
</script>

<div class="container py-8 sm:pt-20" id="privacy">
  <div class="flex flex-col space-y-8 text-center justify-center sm:flex-row sm:space-y-0 sm:space-x-8 sm:pb-8">
    <a href="#InfiniteWorld">InfiniteWorld Privacy Notice</a>
    <a href="#{shortName}">{shortName} Privacy Notice</a>
  </div>
  <InfiniteWorldPrivacy declarativeHeader showToTopUpperButton showToTopLowerButton={false} />
  <AriaPrivacy />
</div>

<style lang="postcss">
  a {
    @apply font-medium underline text-2xl;
  }

  a:hover {
    @apply no-underline;
  }
</style>
