import type { Bid, Listing } from '$lib/sku-item/types';
import { createEffect } from 'effector';
import { placeBidFxErrorHandler } from '$lib/features/product/auction/auction.service';
import { toast } from '$ui/toast';
import { getQueryParameters } from '$util/queryParameter';
import { CLIENT_BIDDING_URL } from '$project/variables';
import { placeBid, loadProductBids } from './auction.api';
import { fetchSkuBidsFx, setSkuBids } from '../sku-auction.store';

export const placeBidFx = createEffect(
  async ({ listing, amount, mintToAddress }: { listing: Listing; amount: number; mintToAddress?: string }) => {
    await placeBid(listing._id, amount, mintToAddress);
  }
);

placeBidFx.done.watch(async ({ params: { listing } }) => {
  // Refetch current page bids
  const id = listing._id;
  const page = +getQueryParameters().get('page') || 1;
  const { data, total, max } = await fetchSkuBidsFx({ id, page });
  setSkuBids({ data, total, max });

  const message = [`You've successfully placed your bid.`];
  if (CLIENT_BIDDING_URL) {
    message.push(`Learn more about bidding <a target="_blank" href="${CLIENT_BIDDING_URL}" rel="noreferrer">here</a>.`);
  }
  toast.success(message.join(' '));
});

placeBidFx.fail.watch(({ error, params }) => {
  placeBidFxErrorHandler(error, params.listing);
});

export const fetchBidsFx = createEffect(
  async ({
    id,
    page,
    perPage,
    fetch,
  }: {
    id: string;
    page: number;
    perPage: number;
    fetch?: Fetch;
  }): Promise<{
    data: Bid[];
    total: number;
    max: number;
  }> => {
    return await loadProductBids({ id, page, perPage, fetch });
  }
);
