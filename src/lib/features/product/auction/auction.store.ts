import type { Bid, Listing } from '$lib/sku-item/types';
import { createEffect, forward } from 'effector';
import { toast } from '$ui/toast';
import { getQueryParameters } from '$util/queryParameter';
import { placeBid, loadProductBids } from './auction.api';
import { fetchProductBidsFx } from '../product.store';

export const placeBidFx = createEffect(async ({ listing, amount }: { listing: Listing; amount: number }) => {
  await placeBid(listing._id, amount);
});

placeBidFx.done.watch(() => {
  toast.success(
    'Your bid was successfully placed. ' +
      'Learn more about biding ' +
      '<a target="_blank" href="https://support.suku.world/infinite-powered-by-suku" rel="noreferrer">here</a>.'
  );
});

placeBidFx.fail.watch(() => {
  toast.danger('Whoops, something went wrong - please try again.');
});

forward({
  from: placeBidFx.done.map(({ params: { listing } }) => ({
    id: listing._id,
    page: +getQueryParameters().get('page') || 1,
  })),
  to: fetchProductBidsFx,
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
