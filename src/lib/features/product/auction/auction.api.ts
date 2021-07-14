import type { Bid, Product } from '$lib/sku-item/types';
import type { NewListing } from './types';
import { fetchTracker, getPage, patch, post } from '$lib/api';
import { bids, maxBid, totalBids } from './auction.store';

export const loadingBids = fetchTracker();

export async function startAuction(
  product: Product,
  startDate: Date,
  endDate: Date,
  minBid: number
): Promise<NewListing> {
  // truncate milliseconds
  startDate.setTime(startDate.getTime() - startDate.getMilliseconds());
  endDate.setTime(endDate.getTime() - endDate.getMilliseconds());

  const apiParameters = {
    issuer: product.owner._id,
    product: product._id,
    type: 'product',
    saleType: 'auction',
    startDate: startDate.toISOString().replace(/\.0+Z$/, ''),
    endDate: endDate.toISOString().replace(/\.0+Z$/, ''),
    minBid: minBid,
  };

  return await post<NewListing>('listings', apiParameters);
}

export async function cancelAuction(listingId: string) {
  await patch(`listings/${listingId}`, { canceled: true });
}

export async function placeBid(listingId: string, amount: number): Promise<Partial<Bid>> {
  return await post(`listings/${listingId}/bids`, { bidAmt: amount });
}

// `?` is used for the `id` type for when there is not active listing
// and the code simply passes `undefined` as the `id` value
export async function loadProductBids({
  id,
  page,
  perPage = 5,
  fetch,
}: {
  id?: string;
  page: number;
  perPage?: number;
  fetch?: Fetch;
}) {
  if (!id) {
    bids.set(undefined);
    totalBids.set(undefined);
    maxBid.set(undefined);

    return;
  }

  const { total, data } = await getPage<Bid>(`bids`, {
    params: { listing: id, includeFunctions: 'true', page: `${page}`, per_page: `${perPage}` },
    tracker: loadingBids,
    fetch,
  });

  bids.set(data);
  totalBids.set(total);

  if (page === 1) {
    maxBid.set(data.length > 0 ? data[0].bidAmt : 0);
  } else {
    await loadMaxProductBid({ id, fetch });
  }
}

async function loadMaxProductBid({ id, fetch }: { id: string; fetch?: Fetch }) {
  const { data } = await getPage<Bid>(`bids`, {
    params: { listing: id, includeFunctions: 'true', page: '1', per_page: '1' },
    tracker: loadingBids,
    fetch,
  });

  maxBid.set(data.length > 0 ? data[0].bidAmt : 0);
}
