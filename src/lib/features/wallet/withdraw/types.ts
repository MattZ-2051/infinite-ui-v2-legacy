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

export type AchAccount = {
  id: string;
  plaidInfo: PlaidAchInfoInternal;
  circleInfo: CircleAchInfoInternal;
  createdAt: Date;
  updatedAt: Date;
};

export type PlaidAchInfoInternal = {
  metadata: PlaidMetadataInternal;
  ach_item_id: string;
  institution_logo: string;
  institution_primary_color: string;
  institution_url: string;
  ach_numbers: PlaidNumbersInternal;
};

export type PlaidMetadataInternal = {
  institution: {
    name: string;
    institution_id: string;
  };
  account_id: string;
  account: PlaidAccountInternal;
  accounts: PlaidAccountInternal[];
};

export type PlaidNumbersInternal = {
  ach: {
    account: string;
    account_id: string;
    routing: string;
    wire_routing: string;
  }[];
  eft: {
    account: string;
    account_id: string;
    institution: string;
    branch: string;
  }[];
  international: {
    account_id: string;
    bic: string;
    iban: string;
  }[];
  bacs: {
    account: string;
    account_id: string;
    sort_code: string;
  }[];
};

export type PlaidAccountInternal = {
  id: string;
  name: string;
  type: string;
  subtype: string;
  mask: string;
};

export type CircleAchInfoInternal = {
  id: string;
  status: 'pending' | 'complete' | 'failed';
  accountNumber: string;
  bankAddress: {
    bankName: string;
    city: string;
    country: string;
    line1: string;
    line2: string;
    district: string;
  };
};
