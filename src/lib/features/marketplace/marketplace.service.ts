import type { QueryParameterOptions } from '$util/queryParameter';
import type { ModeFilterStatus } from './types';
import { MARKETPLACE_INITIAL_MODE_FILTER } from '$project/variables';
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

function getModeStatus(mode: ModeFilterStatus): ModeFilterStatus {
  return mode === MARKETPLACE_INITIAL_MODE_FILTER ? '' : mode;
}

export const modeFilters: { label: string; status: ModeFilterStatus; parameters: Record<string, string> }[] = [
  { label: 'All', status: getModeStatus('all'), parameters: {} },
  { label: 'Available Now', status: getModeStatus('available'), parameters: { forSale: 'true' } },
  { label: 'Upcoming', status: getModeStatus('upcoming'), parameters: { status: 'upcoming' } },
  { label: 'Recently Sold', status: getModeStatus('soldout'), parameters: { forSale: 'false' } },
];
