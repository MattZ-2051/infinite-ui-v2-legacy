import type { Sku, Product } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadFeatured({ fetch }: { fetch: Fetch }) {
  const [skus, products] = await Promise.all([
    get<Sku>(`skus/tiles/?page=1&per_page=8&sortBy=startDate:1`, { fetch }),
    get<Product[]>(
      `products?owner=60a49610ddc7af020455d316&includeFunctions=true&page=1&per_page=8`,
      { fetch }
    ),
  ]);
  return { skus, products };
}
