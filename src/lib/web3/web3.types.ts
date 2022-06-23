import type { ethers } from 'ethers';

export interface EthersContract {
  contractAddress: string;
  contractAbi?: ethers.ContractInterface;
  userAddress?: string;
}
