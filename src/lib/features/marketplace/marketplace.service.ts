import type { QueryParameterOptions } from '$util/queryParameter';
import { gotoQueryParameters } from '$util/queryParameter';

export function setFilters(
  options: Pick<QueryParameterOptions, 'params' | 'reset'>,
  { noscroll = true, keepfocus = true } = {}
): void {
  gotoQueryParameters(
    {
      ...options,
    },
    { noscroll, keepfocus }
  );
}

export const modeFilters = [
  { label: 'All', status: 'all' },
  { label: 'Available Now', status: '' },
  { label: 'Upcoming', status: 'upcoming' },
  { label: 'Sold Out', status: 'soldout' },
];
