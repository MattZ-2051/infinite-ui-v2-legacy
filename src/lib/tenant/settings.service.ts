import { CLIENT_API_HEADER } from '$project/variables';
import { loadTenantSettingsFx, setTenantSettings, tenantSettings } from './settings.store';

export async function loadTenantSettings() {
  if (!tenantSettings.getState()) {
    await loadTenantSettingsFx(CLIENT_API_HEADER).then((result) => setTenantSettings(result));
  }
}
