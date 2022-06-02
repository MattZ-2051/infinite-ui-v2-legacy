import type { LegalConsent } from './types';
import { post, get } from '$lib/api';

export async function addLegalConsent(data: string): Promise<LegalConsent> {
  return await post<LegalConsent>(`users/me/legal-consent/${data}`, {});
}

export async function getLegalConsent(legalConsentId: string) {
  return await get<LegalConsent>(`/legal-consent/${legalConsentId}`, {});
}
