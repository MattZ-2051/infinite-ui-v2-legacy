export interface USDCAddress {
  address: string;
  addressTag: string;
  currency: string;
  chain: string;
}

export type EtherscanActions = 'txlist' | 'tokentx' | 'tokennfttx';

export type EtherscanReturnType<T> = T extends 'txlist'
  ? TxListResponse
  : T extends 'tokentx'
  ? TokenTxReponse
  : T extends 'tokennfttx'
  ? TokenTxReponse
  : never;

export type EtherscanResponse<ResultType> = {
  status: '0' | '1';
  message: string;
  result: ResultType;
};

export interface TxListResponse {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
}

export interface TokenTxReponse {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  nonce: string;
  timeStamp: string;
  to: string;
  tokenDecimal: string;
  tokenName: string;
  tokenSymbol: string;
  transactionIndex: string;
  value: string;
}
