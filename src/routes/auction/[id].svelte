<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import AuctionPage from '../../lib/features/sku-auction/SkuAuction.svelte';
  import { loadSkuAuctionFx, setSkuAuction } from '../../lib/features/sku-auction/sku-auction.store';

  export const load: Load = async ({ url, params, fetch }) => {
    const { id } = params;
    const page = +url.searchParams.get(`page`) || 1;
    return {
      props: { data: await loadSkuAuctionFx({ id, page, fetch }) },
    };
  };
</script>

<script lang="ts">
  export let data: Awaited<ReturnType<typeof loadSkuAuctionFx>>;

  // eslint-disable-next-line unicorn/no-null
  $: setSkuAuction({ ...data, oldId: null });
</script>

<Seo title={data.sku.name} image={chooseSkuSocialImage(data.sku)} />
<AuctionPage />
