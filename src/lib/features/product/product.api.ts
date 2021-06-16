import type { Product, Transaction } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadProduct({ id, fetch }: { id: string; fetch?: unknown }) {
  const [product, transactions] = await Promise.all([
    get<Product>(`products/${id}?includeFunctions=true`, fetch),
    get<Transaction[]>(`products/${id}/transactions`, fetch),
  ]);
  return { product, transactions };
}
