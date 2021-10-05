import type { Bid, Listing } from '$lib/sku-item/types';
import { createEffect } from 'effector';
import { toast } from '$ui/toast';
import { getQueryParameters } from '$util/queryParameter';
import { CLIENT_SUPPORT_URL } from '$project/variables';
import routes from '$project/routes';
import { placeBid, loadProductBids } from './auction.api';
import { fetchProductBidsFx, setProductBids } from '../product.store';

export const placeBidFx = createEffect(async ({ listing, amount }: { listing: Listing; amount: number }) => {
  await placeBid(listing._id, amount);
});

placeBidFx.done.watch(async ({ params: { listing } }) => {
  // Refetch current page bids
  const id = listing._id;
  const page = +getQueryParameters().get('page') || 1;
  const { data, total, max } = await fetchProductBidsFx({ id, page });
  setProductBids({ data, total, max });

  const message = [`You've successfully placed your bid.`];
  if (CLIENT_SUPPORT_URL) {
    message.push(`Learn more about bidding <a target="_blank" href="${CLIENT_SUPPORT_URL}" rel="noreferrer">here</a>.`);
  }
  toast.success(message.join(' '));
});

placeBidFx.fail.watch(() => {
  toast.danger(
    `Whoops, something went wrong.  Please, try again or <a href=${routes.help}>contact support</a> if this issue continues.`
  );
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
