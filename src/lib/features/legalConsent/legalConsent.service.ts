import type { User } from '$lib/user/types';
import type { LegalConsentType } from './types';

export const getConsentsToAgree = (user: User) => {
  return user.activeLegalConsentIds.filter((c) => !user.acceptedLegalConsentIds.includes(c));
};

export const getModalTitle = (legalConsentTitle: string, type: LegalConsentType) => {
  if (type === 'firstTime') return 'Please accept our Terms & Policies';
  if (legalConsentTitle.toLowerCase().includes('terms & policies')) return 'We updated our Terms & Policies';
  if (legalConsentTitle.toLowerCase().includes('terms of service')) return 'We updated our Terms of Service';
  if (legalConsentTitle.toLowerCase().includes('privacy policy')) return 'We updated our Privacy Policy';
  if (legalConsentTitle.toLowerCase().includes('cookies policy')) return 'We updated our Cookies Policy';
};

export const getModalBodyText = (legalConsentTitle: string, type: LegalConsentType) => {
  if (type === 'firstTime')
    return 'Before you can complete the sign in process, you need to read and accept our Terms of Service, Privacy Policy, and Cookies Policy.';
  if (legalConsentTitle.toLowerCase().includes('terms & policies'))
    return 'Before you can complete the sign in process, you need to read and accept  our updated terms and policies.';
  if (legalConsentTitle.toLowerCase().includes('terms of service'))
    return 'Before you can complete the sign in process, you need to read and accept our updated Terms of Service.';
  if (legalConsentTitle.toLowerCase().includes('privacy policy'))
    return 'Before you can complete the sign in process, you need to read and accept our updated Privacy Policy.';
  if (legalConsentTitle.toLowerCase().includes('cookies policy'))
    return 'Before you can complete the sign in process, you need to read and accept our updated Cookies Policy.';
};
