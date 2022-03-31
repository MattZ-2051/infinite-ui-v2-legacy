import type { TenantSettings } from './settings.types';

import { get } from '$lib/api';

export async function fetchTenantSettings({
  tenant,
  fetch,
}: {
  tenant: string;
  fetch?: Fetch;
}): Promise<TenantSettings> {
  return await get<TenantSettings>(`settings/${tenant}`, { fetch });
}
