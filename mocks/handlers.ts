import { rest } from 'msw';
import { mockSku } from './resolvers/mockSku';
// import { mockEmptyTransactions } from './resolvers/mockTransactions';
// import { mockEmptyBids } from './resolvers/mockBids';

const API_URL = 'https://backend-dev.goinfinite.io';

export const handlers = [
  rest.get(`${API_URL}/skus/60cba6691f4d955e2ce39c93`, mockSku),
  // rest.get(`${API_URL}/users/me/transactions`, mockEmptyTransactions),
  // rest.get(`${API_URL}/bids/active`, mockEmptyBids),
];
