// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import type { TenantSettings } from './settings.types';

import { get } from '$lib/api';

export async function fetchTenantSettings({
  tenant,
  fetch,
}: {
  tenant: string;
  fetch?: Fetch;
}): Promise<TenantSettings> {
  // return await get<TenantSettings>(`settings/${tenant}`, { fetch });
  // TODO: refactor when this call becomes unauthenticated
  console.warn('getting tenant settings');
  return <TenantSettings>{
    tenant: 'infinite',
    skuCreationEnabled: true,
  };
}
