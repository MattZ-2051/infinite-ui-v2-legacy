import type { StatusGateKeeping } from './types';
import { goto } from '$app/navigation';
import routes from '$project/routes';

export const getStatusLabelAndColor = (
  status: StatusGateKeeping,
  statusLabel: string,
  statusLabelColor: string,
  hasButton: boolean
): { statusLabel: string; statusLabelColor: string; hasButton: boolean } => {
  if (status === 'owned') {
    statusLabel = 'Owned';
    statusLabelColor = '#ddf874';
  }
  if (status === 'notOwnedYet') {
    statusLabel = 'Not Owned';
    statusLabelColor = '#E83737';
  }
  if (status === 'nowViewing') {
    statusLabel = 'Now Viewing';
    statusLabelColor = 'white';
  }
  if (status === 'soldOut') {
    statusLabel = 'Sold out';
    statusLabelColor = 'white';
  }

  hasButton = status === 'buyNow';

  return { statusLabel, statusLabelColor, hasButton };
};

export const redirectToMarketplace = (skuId: string) => {
  goto(routes.sku(skuId));
};
