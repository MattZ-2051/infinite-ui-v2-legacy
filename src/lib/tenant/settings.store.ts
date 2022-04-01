import type { Awaited } from 'ts-essentials';
import type { TenantSettings } from './settings.types';
import { createEffect, createStore, createEvent } from 'effector';
import { fetchTenantSettings } from './settings.api';

export const setTenantSettings = createEvent<Awaited<ReturnType<typeof loadTenantSettingsFx>>>();

export const loadTenantSettingsFx = createEffect(
  async (tenant: string) => await fetchTenantSettings({ tenant, fetch })
);

// eslint-disable-next-line unicorn/no-null
export const tenantSettings = createStore<TenantSettings>(null).on(setTenantSettings, (state, payload) => payload);
