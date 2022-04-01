import type { Bid, ListingAuctionPayload, Product } from '$lib/sku-item/types';
import type { NewListing } from './types';
import { fetchTracker, getPage, patch, post } from '$lib/api';

export const loadingBids = fetchTracker();

export async function startAuction(listing: ListingAuctionPayload): Promise<NewListing> {
  return post<NewListing>('listings', listing);
}

export function mintProduct(skuId: string): Promise<Product> {
  return post(`/products`, { sku: skuId });
}

export async function cancelAuction(listingId: string) {
  await patch(`listings/${listingId}/cancel`, undefined);
}

export async function placeBid(listingId: string, amount: number, mintToAddress?: string): Promise<Partial<Bid>> {
  return await post(
    `listings/${listingId}/bids`,
    mintToAddress ? { bidAmt: amount, mintToAddress } : { bidAmt: amount }
  );
}

export async function loadProductBids({
  id,
  page,
  perPage = 5,
  fetch,
}: {
  id: string;
  page: number;
  perPage?: number;
  fetch?: Fetch;
}): Promise<{
  data: Bid[];
  total: number;
  max: number;
}> {
  const { total, data } = await getPage<Bid>(`bids`, {
    params: { listing: id, includeFunctions: 'true', page: `${page}`, per_page: `${perPage}` },
    tracker: loadingBids,
    fetch,
  });

  let max: number;
  if (total > 0) {
    // TODO: make these in parallel
    max = page === 1 ? data[0].bidAmt : await loadMaxProductBid({ id, fetch });
  }

  return { total, data, max };
}

async function loadMaxProductBid({ id, fetch }: { id: string; fetch?: Fetch }): Promise<number> {
  const { data } = await getPage<Bid>(`bids`, {
    params: { listing: id, includeFunctions: 'true', page: '1', per_page: '1' },
    tracker: loadingBids,
    fetch,
  });

  return data[0]?.bidAmt;
}
