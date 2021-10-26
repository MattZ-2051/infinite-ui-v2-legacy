<script lang="ts">
  import Cookies from 'js-cookie';
  import { mdiClose } from '@mdi/js';
  import { browser } from '$app/env';
  import routes from '$project/routes';

  import Icon from '$ui/icon/Icon.svelte';

  const cookieName = 'gdpr_notice_shown';

  let open = browser && Cookies.get(cookieName) !== 'true';

  function onClose() {
    Cookies.set(cookieName, 'true');
    open = false;
  }
</script>

{#if open}
  <article class="fixed bottom-12 z-50 w-full">
    <section
      class="flex sm:gap-12 items-start w-11/12 bg-white bg-opacity-95 text-black rounded-lg px-4 md:px-8 py-6 m-auto text-sm sm:text-lg shadow-2xl"
    >
      <div class="flex-grow">
        <p>
          By using this website, you agree to our use of cookies as outlined in our
          <a class="underline hover:no-underline font-medium" href={routes.privacy}>Privacy Policy.</a>
        </p>
        <p class="mt-2">
          We use cookies to provide you with a great experience and to help our website run effectively.
        </p>
      </div>
      <div class="flex-grow-0">
        <button
          type="button"
          on:click={onClose}
          title="Close"
          class="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-0.5 inline-flex items-center justify-center z-10"
        >
          <Icon path={mdiClose} size={0.8} />
        </button>
      </div>
    </section>
  </article>
{/if}
