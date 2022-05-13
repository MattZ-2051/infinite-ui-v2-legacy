<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadSkuFx, setSku, sku } from '$lib/features/sku/sku.store';
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import { loadSkuAuctionFx, setSkuAuction } from '$lib/features/sku-auction/sku-auction.store';

  export const load: Load = async ({ params, fetch }) => {
    const { id } = params;
    return {
      props: { data: await loadSkuFx({ id, fetch }), auctionData: await loadSkuAuctionFx({ id, page: 1, fetch }) },
    };
  };
</script>

<script lang="ts">
  import Checkout from '$lib/features/checkout/Checkout.svelte';
  import { verifyStripeStatusFx } from '$lib/features/stripe/stripe.store';
  import { page } from '$app/stores';

  export let data: Awaited<ReturnType<typeof loadSkuFx>>;
  export let auctionData: Awaited<ReturnType<typeof loadSkuAuctionFx>>;

  const clientSecret = $page.url.searchParams.get('payment_intent_client_secret');

  if (clientSecret && !!data.sku) {
    verifyStripeStatusFx({ clientSecret });
  }

  $: setSku(data);

  // eslint-disable-next-line unicorn/no-null
  $: setSkuAuction({ ...auctionData, oldId: null });
</script>

<Seo title={data.sku.name} image={chooseSkuSocialImage(data.sku)} />

<Checkout sku={$sku} />
