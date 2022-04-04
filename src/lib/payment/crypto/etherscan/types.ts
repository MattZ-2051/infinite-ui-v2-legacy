export type EtherscanResponse<ResultType> = {
  status: '0' | '1';
  message: string;
  result: ResultType;
};

type TxLog = {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
};

export interface TokenTxResponse {
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
  logs: TxLog[];
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

export interface TxReceiptStatusResponse {
  status: '' | '0' | '1';
}

export type TxStatus = 'pending' | 'confirmed' | 'error';

export interface TxReceipt {
  jsonrpc: string;
  id: string;
  result: TokenTxResponse;
}
