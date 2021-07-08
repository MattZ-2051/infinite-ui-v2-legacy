import { rest } from 'msw';
import { variables } from '../src/lib/variables';
import { mockSku } from './resolvers/mockSku';
import { ROPSTEN_API_URL, mockRopsten } from './resolvers/mockRopsten';
// import { mockEmptyTransactions } from './resolvers/mockTransactions';
// import { mockEmptyBids } from './resolvers/mockBids';

const API_URL = variables.apiUrl;

export const handlers = [
  rest.get(`${API_URL}/skus/60cba6691f4d955e2ce39c93`, mockSku),
  rest.get(ROPSTEN_API_URL, mockRopsten(2)),
  // rest.get(`${API_URL}/users/me/transactions`, mockEmptyTransactions),
  // rest.get(`${API_URL}/bids/active`, mockEmptyBids),
];
