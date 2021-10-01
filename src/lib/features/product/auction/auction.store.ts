import type { Bid, Listing } from '$lib/sku-item/types';
import { createEffect, forward } from 'effector';
import { toast } from '$ui/toast';
import { getQueryParameters } from '$util/queryParameter';
import { CLIENT_SUPPORT_URL } from '$project/variables';
import { placeBid, loadProductBids } from './auction.api';
import { fetchProductBidsFx } from '../product.store';

export const placeBidFx = createEffect(async ({ listing, amount }: { listing: Listing; amount: number }) => {
  await placeBid(listing._id, amount);
});

placeBidFx.done.watch(() => {
  const message = [`Your bid was successfully placed.`];
  if (CLIENT_SUPPORT_URL) {
    message.push(`Learn more about bidding <a target="_blank" href="${CLIENT_SUPPORT_URL}" rel="noreferrer">here</a>.`);
  }
  toast.success(message.join(' '));
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
