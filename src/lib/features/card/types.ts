export interface District {
  name: string;
  stateCode: string;
}

export interface Country {
  name: string;
  iso2: string;
  states?: Array<District>;
}
export interface NewCreditCard extends Record<string, unknown> {
  cardNumber: string;
  cvv: number;
  expMonth: number;
  expYear: number;
  metadata: {
    email: string;
  };
  billingDetails: {
    name: string;
    city: string;
    country: string;
    line1: string;
    line2: string;
    district: string;
    postalCode: string;
  };
}

export interface AddFundsRequest {
  email: string;
  amount: string;
}
