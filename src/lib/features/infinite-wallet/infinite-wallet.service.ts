import type { AccountData } from './types';
import { Client, AccountBalanceQuery } from '@hashgraph/sdk';
import type TokenBalanceMap from '@hashgraph/sdk/lib/account/TokenBalanceMap';

export async function constructClient(account: AccountData): Promise<Client | undefined> {
  let client: Client;

  // Will prompt user to sign transactions
  const signer = window.wallet.getTransactionSigner();

  switch (account.network) {
    case 'Testnet':
      client = Client.forTestnet();
      break;
    case 'Mainnet':
      client = Client.forMainnet();
      break;
    case 'Previewnet':
      client = Client.forPreviewnet();
      break;
  }

  if (client !== undefined) {
    if (account.privateKey !== undefined) {
      client.setOperator(account.id, account.privateKey);
    } else if (signer !== undefined && account.publicKey !== undefined) {
      client.setOperatorWith(account.id, account.publicKey, signer);
    } else {
      return undefined;
    }
  }
  return client;
}

export async function getTokenBalance(account: AccountData): Promise<TokenBalanceMap> {
  const client = await constructClient(account);
  const query = new AccountBalanceQuery().setAccountId(account.id);
  const tokenBalance = await query.execute(client);

  return tokenBalance.tokens;
}
