import type { AccountData, MirrorNodeBalanceResponse } from './types';
import type { Product, Profile } from '$lib/sku-item/types';
import type { TransactionReceipt, TransactionResponse } from '@hashgraph/sdk';
import type TokenBalanceMap from '@hashgraph/sdk/lib/account/TokenBalanceMap';
import {
  Client,
  AccountBalanceQuery,
  TokenAssociateTransaction,
  TransferTransaction,
  TokenDissociateTransaction,
  TokenId,
  NftId,
} from '@hashgraph/sdk';
import Long from 'long';

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

export async function associateToken(tokenId: TokenId | string, account: AccountData) {
  let txId: string;
  let txReceipt: TransactionReceipt | void;
  try {
    const client = await constructClient(account);
    const tx = new TokenAssociateTransaction().setAccountId(account.id).setTokenIds([tokenId]);
    await tx.signWithOperator(client);
    const response = await tx.execute(client).catch((error) => {
      throw error;
    });
    if (response) {
      txId = response.transactionId.toString();
      txReceipt = await response.getReceipt(client).catch((error) => {
        throw error;
      });
      return { txId, txReceipt };
    }
  } catch (error) {
    // Ignore TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT (194) error
    if (error?.status?._code !== 194) {
      throw error;
    }
  }
}

export async function dissociateToken(tokenId: TokenId | string, account: AccountData) {
  let txId: string;
  let txReceipt: TransactionReceipt | void;
  const client = await constructClient(account);
  const tx = new TokenDissociateTransaction().setAccountId(account.id).setTokenIds([tokenId]);

  const response = await tx.execute(client).catch((error) => {
    throw error;
  });
  if (response) {
    txId = response.transactionId.toString();
    txReceipt = await response.getReceipt(client).catch((error) => {
      throw error;
    });
    return { txId, txReceipt };
  }
}

export async function transferToken(
  product: Product,
  account: AccountData,
  balanceData: MirrorNodeBalanceResponse,
  user: Profile
) {
  let response: TransactionResponse;
  let txId: string;
  let txReceipt: TransactionReceipt | void;
  let txHash: string;
  let type: 'NON_FUNGIBLE_UNIQUE' | 'FUNGIBLE_COMMON';

  const { tokenId, nftSerial } = product;
  const foundToken = balanceData?.tokens?.find((token) => token.token_id === tokenId);
  if (foundToken) type = foundToken.type;

  const client = await constructClient(account);

  const id = TokenId.fromString(tokenId);

  if (type.includes('NON_FUNGIBLE') && nftSerial) {
    const serial = Long.fromString(nftSerial);
    const nftId = new NftId(id, serial);

    const tx = new TransferTransaction().addNftTransfer(nftId, account.id, user.hederaAccount).freezeWith(client);

    await tx.signWithOperator(client);

    response = await tx.execute(client).catch((error) => {
      throw error;
    });
  } else {
    const tx = new TransferTransaction()
      .addTokenTransfer(id, account.id, -1)
      .addTokenTransfer(id, user.hederaAccount, 1);

    await tx.signWithOperator(client);

    response = await tx.execute(client).catch((error) => {
      throw error;
    });
  }

  if (response) {
    txId = response.transactionId.toString();
    // convert Uint8Array hash to hex string
    txHash = [...response.transactionHash].map((x) => x.toString(16).padStart(2, '0')).join('');
    txReceipt = await response.getReceipt(client).catch((error) => {
      throw error;
    });
  }

  return { txId, txReceipt, txHash };
}
