import { rest } from 'msw';
import { variables } from '../src/lib/variables';
import { mockSku } from './resolvers/sku/mockSku';
import { ROPSTEN_API_URL, mockRopsten } from './resolvers/mockRopsten';
import { BLOCKCYPHER_API_URL, mockBlockcypher } from './resolvers/mockBlockcypher';
import { mockHederaTransactions } from './resolvers/mockHederaTransactions';
// import { mockEmptyTransactions } from './resolvers/mockTransactions';
// import { mockPendingTransactions } from './resolvers/mockTransactions';
// import { mockEmptyBids } from './resolvers/mockBids';
// import { mockProfile } from './resolvers/mockProfile';

const API_URL = variables.apiUrl;

export const handlers = [
  rest.get(`${API_URL}/skus/60cba6691f4d955e2ce39c93`, mockSku),
  rest.get(ROPSTEN_API_URL, mockRopsten(2)),
  rest.get(new RegExp(`^${BLOCKCYPHER_API_URL}`), mockBlockcypher(2)),
  rest.post(`${API_URL}/wallet/hbar/check`, mockHederaTransactions),
  // rest.get(`${API_URL}/users/me/transactions`, mockPendingTransactions(3)),
  // rest.get(`${API_URL}/users/me/transactions`, mockEmptyTransactions),
  // rest.get(`${API_URL}/bids/active`, mockEmptyBids),
  // rest.get(`${API_URL}/users`, mockProfile),
];
