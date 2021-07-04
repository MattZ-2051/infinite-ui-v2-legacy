import type { Product, Transaction, ListingSalePayload } from '$lib/sku-item/types';
import { get, patch, post } from '$lib/api';

export async function loadProduct({ id, fetch }: { id: string; fetch?: Fetch }): Promise<Product> {
  return await get<Product>(`products/${id}?includeFunctions=true`, { fetch });
}

export async function loadProductTransactions({ id, fetch }: { id: string; fetch?: Fetch }): Promise<Transaction[]> {
  return await get<Transaction[]>(`products/${id}/transactions`, { fetch });
}

export async function createSale({ listing, fetch }: { listing: ListingSalePayload; fetch?: Fetch }) {
  return await post<ListingSalePayload>(`listings`, listing, { fetch });
}

export async function cancelSale({ id }: { id: string }) {
  return await patch(`listings/${id}/cancel`, {});
}
