import type { Product, Transaction, ListingSalePayload } from '$lib/sku-item/types';
import { get, post } from '$lib/api';

export async function loadProduct({ id, fetch }: { id: string; fetch?: Fetch }) {
  const [product, transactions] = await Promise.all([
    get<Product>(`products/${id}?includeFunctions=true`, { fetch }),
    get<Transaction[]>(`products/${id}/transactions`, { fetch }),
  ]);
  return { product, transactions };
}

export async function createSale({ listing, fetch }: { listing: ListingSalePayload; fetch?: Fetch }) {
  return await post<ListingSalePayload>(`listings`, listing, { fetch });
}
