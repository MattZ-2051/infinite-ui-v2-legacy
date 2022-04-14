import type { StatusGateKeeping } from './types';

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
    statusLabel = 'Not Owned Yet';
    statusLabelColor = '#E83737';
  }
  if (status === 'nowViewing') {
    statusLabel = 'Now Viewing';
    statusLabelColor = 'white';
  }

  hasButton = status === 'buyNow';

  return { statusLabel, statusLabelColor, hasButton };
};
