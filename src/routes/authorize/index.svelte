<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { toast } from '$ui/toast';

  const EMAIL_NOT_VERIFIED = 'Email not verified';
  const REMOVE_EMAIL_FIELD = 'user_email=';
  const BANNED_USER = 'Banned user';
  const BANNER_LABEL = 'Your account has been disabled by the administrator.';
  interface LoadErrorResponseValue {
    status: number;
    props?: {
      url: string;
      returnUrl: string;
    };
    error?: string;
  }

  export const load: Load = async ({ url }) => {
    let urlString: string = undefined;

    let loadErrorResponseValue: LoadErrorResponseValue = {
      status: 200,
      props: {
        url: urlString,
        returnUrl: url.searchParams.get('returnUrl'),
      },
    };

    if (url.searchParams.has('code') && url.searchParams.has('state')) {
      loadErrorResponseValue.props.url = `://${url.hostname}${url.pathname}?${url.searchParams}`;
    } else if (url.searchParams.has('error')) {
      const errors = url.searchParams.get('error_description').split('#');
      const errorTypes = errors[0];
      if (errorTypes === EMAIL_NOT_VERIFIED) {
        const email = errors[1].replace(REMOVE_EMAIL_FIELD, '');
        loadErrorResponseValue.props.returnUrl = `${url.origin}${routes.verficationEmail(email)}`;
      } else if (errorTypes === BANNED_USER) {
        const toastId = 'BANNED_USER';
        toast.danger(BANNER_LABEL, { toastId });
        isBanned.set(true);
        if (typeof window !== 'undefined') onSignOut(true);
        loadErrorResponseValue = {
          status: 401,
          error: url.searchParams.get('error_description') || 'Unknown authorization error',
        };
      } else {
        loadErrorResponseValue = {
          status: 401,
          error: url.searchParams.get('error_description') || 'Unknown authorization error',
        };
      }
    }
    return loadErrorResponseValue;
  };
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { initUserAuth, handleRedirectCallback, onSignOut, isBanned } from '$lib/user';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import routes from '$project/routes';

  export let url: string;
  export let returnUrl: string;

  if (browser) {
    (async () => {
      if (url) {
        await handleRedirectCallback(url);
      }
      await initUserAuth();
      await goto(returnUrl || `/${window.location.search}`, { replaceState: true });
    })();
  }
</script>

<FullScreenLoader class="fixed top-0 bottom-0 right-0 left-0 bg-black text-white z-∞" --lds-size="3.75rem"
  ><span class="text-2xl">Authorizing...</span>
</FullScreenLoader>
