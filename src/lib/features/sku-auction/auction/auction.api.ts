import type { Bid } from '$lib/sku-item/types';
import { fetchTracker, getPage, post } from '$lib/api';

export const loadingBids = fetchTracker();

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
