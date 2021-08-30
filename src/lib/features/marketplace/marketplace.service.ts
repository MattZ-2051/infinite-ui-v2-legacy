import type { QueryParameterOptions } from '$util/queryParameter';
import { gotoQueryParameters } from '$util/queryParameter';

export function setFilters(options: Pick<QueryParameterOptions, 'params' | 'reset'>): void {
  gotoQueryParameters(
    {
      ...options,
    },
    { noscroll: true, keepfocus: true }
  );
}

export const modeFilters = [
  { label: 'All', status: 'all' },
  { label: 'Available Now', status: '' },
  { label: 'Upcoming', status: 'upcoming' },
  { label: 'Sold Out', status: 'soldout' },
];
