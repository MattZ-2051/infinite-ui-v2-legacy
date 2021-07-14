import type { Product, Transaction, ListingSalePayload } from '$lib/sku-item/types';
import { get, patch, post, getPage, fetchTracker } from '$lib/api';

export const loadingTransactions = fetchTracker();

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
