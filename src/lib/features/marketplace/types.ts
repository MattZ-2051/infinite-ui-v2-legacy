export type ModeFilterStatus = 'all' | 'upcoming' | 'available' | 'soldout' | '';

export type FilterType = {
  type: 'category' | 'series' | 'issuerId' | 'price' | 'date' | 'search' | 'saleType' | 'currency';
  label: string;
  id: string;
};
