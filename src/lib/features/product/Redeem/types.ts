export interface RedeemInfo extends Record<string, unknown> {
  city: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  district: string;
  postalCode: string;
  shippingNotes: string;
}
