export interface TxResponse {
  tx_hash: string;
  block_height: string;
  tx_input_n: string;
  tx_output_n: string;
  value: string;
  ref_balance: string;
  spent: boolean;
  confirmations: number;
  confirmed: Date;
  double_spend: boolean;
  script: string;
}

export interface AddressInfoResponse {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
  txrefs?: TxResponse[];
  unconfirmed_txrefs?: TxResponse[];
  tx_url: string;
}
