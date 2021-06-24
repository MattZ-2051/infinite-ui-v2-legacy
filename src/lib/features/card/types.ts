export interface District {
  name: string;
  stateCode: string;
}

export interface Country {
  name: string;
  iso2: string;
  states?: Array<District>;
}

export interface Card {
  id: string;
  status: string;
  last4: string;
  network: string;
  expYear: number;
  expMonth: number;
  metadata: {
    phoneNumber: string;
    email: string;
  };
  fingerprint: string;
}
