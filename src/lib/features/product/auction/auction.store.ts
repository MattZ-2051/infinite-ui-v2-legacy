import type { Bid, Listing } from '$lib/sku-item/types';
import { createEffect } from 'effector';
import { getQueryParameters } from '$util/queryParameter';
import { handleCheckoutStateChange } from '$lib/features/checkout/checkout.service';
import { placeBid, loadProductBids } from './auction.api';
import { fetchProductBidsFx, setProductBids } from '../product.store';
import { placeBidFxErrorHandler } from './auction.service';

export const placeBidFx = createEffect(
  async ({ listing, amount, mintToAddress }: { listing: Listing; amount: number; mintToAddress?: string }) => {
    handleCheckoutStateChange('processing');
    await placeBid(listing._id, amount, mintToAddress);
  }
);

placeBidFx.done.watch(async ({ params: { listing } }) => {
  // Refetch current page bids
  const id = listing._id;
  const page = +getQueryParameters().get('page') || 1;
  const { data, total, max } = await fetchProductBidsFx({ id, page });
  setProductBids({ data, total, max });
  handleCheckoutStateChange('success');
});

placeBidFx.fail.watch(({ error, params }) => {
  placeBidFxErrorHandler(error, params.listing);
  handleCheckoutStateChange('error');
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
