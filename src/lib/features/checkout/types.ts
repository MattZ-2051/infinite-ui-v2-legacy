export type IconSource = (
  | { d: string; fill: string; 'fill-rule'?: undefined; 'clip-rule'?: undefined }
  | { 'fill-rule': string; 'clip-rule': string; d: string; fill: string }
)[];
