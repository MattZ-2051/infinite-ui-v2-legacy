import type { Product, Transaction, ListingSalePayload, Bid } from '$lib/sku-item/types';
import { get, patch, post, getPage, fetchTracker } from '$lib/api';

export const loadingTransactions = fetchTracker();
export const loadingAuctions = fetchTracker();

export async function loadProduct({ id, fetch }: { id: string; fetch?: Fetch }): Promise<Product> {
  return await get<Product>(`products/${id}?includeFunctions=true`, { fetch });
}

export async function createSale({ listing, fetch }: { listing: ListingSalePayload; fetch?: Fetch }) {
  return await post<ListingSalePayload>(`listings`, listing, { fetch });
}

export async function cancelSale({ id }: { id: string }) {
  return await patch(`listings/${id}/cancel`, {});
}

export async function loadProductTransactions({
  id,
  page,
  fetch,
}: {
  id: string;
  page: number;
  fetch?: Fetch;
}): Promise<{ total: number; data: Transaction[] }> {
  return await getPage<Transaction>(`products/${id}/transactions`, {
    params: { page: `${page}`, per_page: '5' },
    tracker: loadingTransactions,
    fetch,
  });
}

export async function loadProductAuctions({
  id,
  page,
  per_page,
  fetch,
}: {
  id: string;
  page: number;
  per_page: number;
  fetch?: Fetch;
}): Promise<{ data: Bid[]; total: number }> {
  return await getPage<Bid>(`bids`, {
    params: { listing: id, includeFunctions: 'true', page: `${page}`, per_page: `${per_page}` },
    tracker: loadingAuctions,
    fetch,
  });
}
