<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadSkuFx, setSku, sku } from '$lib/features/sku/sku.store';

  export async function load({ params, fetch }: LoadInput) {
    const { id } = params;
    return {
      props: { data: await loadSkuFx({ id, fetch }) },
    };
  }
</script>

<script lang="ts">
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import Checkout from '$lib/features/checkout/Checkout.svelte';
  import { verifyStripeStatusFx } from '$lib/features/stripe/stripe.store';
  import { page } from '$app/stores';

  export let data: Awaited<ReturnType<typeof loadSkuFx>>;

  const clientSecret = $page.url.searchParams.get('payment_intent_client_secret');
  if (clientSecret && !!data.sku) {
    verifyStripeStatusFx({ clientSecret, sku: data.sku });
  }

  $: setSku(data);
</script>

<Seo title={data.sku.name} image={chooseSkuSocialImage(data.sku)} />

<Checkout sku={$sku} />
