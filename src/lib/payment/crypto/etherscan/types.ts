export type EtherscanResponse<ResultType> = {
  status: '0' | '1';
  message: string;
  result: ResultType;
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
