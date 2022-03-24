<script lang="ts">
  import { onMount } from 'svelte';
  import routes from '$project/routes';
  import { isBannerVisible, initializeBanner, hideBanner } from './gdpr.store';

  onMount(() => {
    initializeBanner();
  });
</script>

{#if $isBannerVisible}
  <article class="fixed bottom-12 z-50 w-full">
    <section
      class="flex flex-col sm:flex-row gap-4 sm:gap-12 items-end w-11/12 bg-white bg-opacity-95 text-black rounded-lg px-4 md:px-8 py-6 m-auto text-sm sm:text-lg shadow-2xl"
    >
      <div class="flex-grow">
        <div class="font-extrabold mb-2">We value your privacy</div>
        <p>
          We use cookies to enhance your browsing experience and to analyze our traffic. By clicking "Accept All", you
          consent to our use of cookies as outlined in our
          <a class="underline hover:no-underline font-medium" href={routes.privacy}>Privacy Policy.</a>
          <a class="underline hover:no-underline font-medium" href={routes.cookies}>Read More</a>
        </p>
      </div>
      <div class="whitespace-nowrap">
        <button
          type="button"
          on:click={() => hideBanner(false)}
          title="Close"
          class="bg-white hover:bg-white-opacity-20 text-black rounded-full border-2 border-black px-4 py-2 inline-flex items-center justify-center z-10"
        >
          Reject All
        </button>
        <button
          type="button"
          on:click={() => hideBanner(true)}
          title="Close"
          class="bg-black hover:bg-opacity-80 text-white rounded-full px-4 py-2 inline-flex items-center justify-center z-10"
        >
          Accept All
        </button>
      </div>
    </section>
  </article>
{/if}
