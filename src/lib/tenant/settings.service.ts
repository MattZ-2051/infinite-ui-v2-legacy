import { CLIENT_API_HEADER } from '$project/variables';
import { loadTenantSettingsFx, setTenantSettings, tenantSettings } from './settings.store';

export async function loadTenantSettings({ fetch }: { fetch: Fetch }) {
  if (!tenantSettings.getState()) {
    await loadTenantSettingsFx({ tenant: CLIENT_API_HEADER, fetch }).then((result) => setTenantSettings(result));
  }
}
