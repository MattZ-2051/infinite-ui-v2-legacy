export type NewBankAccount = {
  holderName: string;
  addressLine1: string;
  addressLine2: string;
  phoneNumber: string;
  email: string;
  postalCode: string;
  city: string;
  country: string;
  district: string;
};

export type AchLinkToken = {
  linkToken: string;
};
