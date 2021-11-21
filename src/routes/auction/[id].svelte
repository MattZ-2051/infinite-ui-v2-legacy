<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { Seo, chooseSkuSocialImage } from '$lib/seo';
  import AuctionPage from '../../lib/features/sku-auction/SkuAuction.svelte';
  import { loadSkuAuctionFx, setSkuAuction } from '../../lib/features/sku-auction/sku-auction.store';

  export async function load({ page: pageData, fetch }: LoadInput) {
    const { id } = pageData.params;
    const page = +pageData.query.get(`page`) || 1;
    return {
      props: { data: await loadSkuAuctionFx({ id, page, fetch }) },
    };
  }
</script>

<script lang="ts">
  export let data: Awaited<ReturnType<typeof loadSkuAuctionFx>>;

  // eslint-disable-next-line unicorn/no-null
  $: setSkuAuction({ ...data, oldId: null });
</script>

<Seo title={data.sku.name} image={chooseSkuSocialImage(data.sku)} />
<AuctionPage />
