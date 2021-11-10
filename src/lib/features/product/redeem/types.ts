export interface RedeemInfo extends Record<string, unknown> {
  city: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  district: { name: string; stateCode: string };
  postalCode: string;
  shippingNotes: string;
  name: string;
}
