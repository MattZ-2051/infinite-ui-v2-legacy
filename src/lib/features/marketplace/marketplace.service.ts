import type { QueryParameterOptions } from '$util/queryParameter';
import { goto } from '$app/navigation';
import { handleQueryParameter } from '$util/queryParameter';

export function setFilters(options: Pick<QueryParameterOptions, 'params' | 'reset'>): void {
  const url = handleQueryParameter({
    ...options,
  });
  goto(url, { noscroll: true, keepfocus: true });
}

export const statusFilters = [
  { label: 'All', status: '' },
  { label: 'Released', status: 'released' },
  { label: 'Upcoming', status: 'upcoming' },
];
