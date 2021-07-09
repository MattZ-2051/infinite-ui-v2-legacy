import type { Product } from '$lib/sku-item/types';
import type { NewListing } from './types';
import { patch, post } from '$lib/api';

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
