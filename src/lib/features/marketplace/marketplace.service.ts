import type { QueryParameterOptions } from '$util/queryParameter';
import { goto } from '$app/navigation';
import { handleQueryParameter } from '$util/queryParameter';

export function setFilters(options: Pick<QueryParameterOptions, 'params' | 'reset'>): void {
  const url = handleQueryParameter({
    base: `/marketplace`,
    ...options,
  });
  goto(url, { noscroll: true });
}
