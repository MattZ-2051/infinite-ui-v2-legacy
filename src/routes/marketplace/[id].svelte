<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadSkuFx, setSku } from '$lib/features/sku/sku.store';
  import routes from '$project/routes';

  const MARKETPLACE_PHASE_ENABLED = import.meta.env?.VITE_CHECKOUT_ENABLED_PHASE;

  export const load: Load = async ({ params, fetch, url }) => {
    // TODO: Refactor to use phase as an env var and not as query param.
    if (MARKETPLACE_PHASE_ENABLED && MARKETPLACE_PHASE_ENABLED !== url.searchParams.get('phase')) {
      return {
        status: 302,
        redirect: routes.index,
      };
    }

    const { id } = params;
    return {
      props: { data: await loadSkuFx({ id, fetch }) },
    };
  };
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import SkuContainer from '$lib/features/sku/Sku.svelte';
  import { verifyStripeStatusFx } from '$lib/features/stripe/stripe.store';
  import { page } from '$app/stores';
  import { openModal } from '$ui/modals';
  import OrderModalEth from '$lib/features/order/OrderModalETH.svelte';
  import { getActiveListings } from '$lib/features/sku/sku.service';

  export let data: Awaited<ReturnType<typeof loadSkuFx>>;

  const isPayingWithStripe = $page.url.searchParams.get('step') === 'stripe-checkout';
  const clientSecret = $page.url.searchParams.get('payment_intent_client_secret');

  if (clientSecret && !!data.sku) {
    verifyStripeStatusFx({ clientSecret });
  } else if (isPayingWithStripe) {
    const { sku } = data;
    const activeListings = getActiveListings(sku);
    openModal(OrderModalEth, { sku, listing: activeListings[0], paymentMethod: 'stripe' });
  }

  $: setSku(data);
</script>

<Seo title={data.sku.name} image={chooseSkuSocialImage(data.sku)} ogDescription={data.sku?.descriptionShort} />

<SkuContainer />
