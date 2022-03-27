import { loadTenantSettingsFx, setTenantSettings, tenantSettings } from './settings.store';

export async function loadTenantSettings() {
  if (!tenantSettings.getState()) {
    // TODO: make tenant variable
    await loadTenantSettingsFx('infinite').then((result) => setTenantSettings(result));
  }
}
