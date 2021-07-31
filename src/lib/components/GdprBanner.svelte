<script lang="ts">
  import Cookies from 'js-cookie';
  import { mdiClose } from '@mdi/js';
  import { browser } from '$app/env';

  import Icon from '$ui/icon/Icon.svelte';

  const cookieName = 'gdpr_notice_shown';

  let open = browser && Cookies.get(cookieName) !== 'true';

  function onClose() {
    Cookies.set(cookieName, 'true');
    open = false;
  }
</script>

{#if open}
  <article class="fixed bottom-4 z-40 w-full">
    <section class="flex gap-28 items-center max-w-max bg-white rounded-xl px-8 py-6 m-auto text-lg shadow-2xl">
      <div class="flex-grow">
        <p>
          By using this website, you agree to our use of cookies as outlined in our
          <a class="underline hover:no-underline font-medium" href="/privacy">Privacy Policy.</a>
        </p>
        <p>We use cookies to provide you with a great experience and to help our website run effectively.</p>
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
