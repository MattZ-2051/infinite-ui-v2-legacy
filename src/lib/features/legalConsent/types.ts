export type LegalConsent = {
  title: string;
  content: string;
  tenant: string;
};

export type LegalConsentType = 'firstTime' | 'update';
