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

export const statusFilters = [
  { label: 'All', status: '' },
  { label: 'Released', status: 'released' },
  { label: 'Upcoming', status: 'upcoming' },
];
