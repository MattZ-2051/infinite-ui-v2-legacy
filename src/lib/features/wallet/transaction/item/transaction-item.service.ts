import type { Transaction } from '$lib/sku-item/types';
import moonpay from '../assets/moonpay-avatar.png';
import soldNormal from '../assets/sold-normal.png';
import boughtNormal from '../assets/bought-normal.png';
import withdrawalFunds from '../assets/withdrew-funds.png';
import addedFunds from '../assets/added-funds.png';
import usdcoin from '../assets/usdcoin.png';
import ethcoin from '../assets/ethcoin.png';
import addedFundsCoinbase from '../assets/added-funds-coinbase.png';
import bitcoin from '../assets/bitcoin.png';
import masterCard from '../assets/master-card.png';
import visa from '../assets/visa.png';

const getCardLogo = (network: string | undefined): string => {
  if (network) {
    switch (network.toLowerCase()) {
      case 'mastercard':
        return masterCard;
      case 'visa':
        return visa;
    }
  }
  return addedFunds;
};

export const selectLogo = (transaction: Transaction): [string, string] => {
  const type = transaction.type;
  const { deposit, withdraw, sku, product } = transaction.transactionData;
  const nftPublicAsset = product?.nftPublicAssets?.[0] || sku?.nftPublicAssets?.[0];

  switch (type) {
    case 'royalty_fee':
    case 'sale':
      return [nftPublicAsset?.url || soldNormal, 'sold'];

    case 'nft_claim_giveaway':
    case 'purchase':
      return [nftPublicAsset?.url || boughtNormal, 'bought'];

    case 'withdrawal':
      return [
        withdraw?.institution_logo ? `data:image/png;base64,${withdraw.institution_logo}` : withdrawalFunds,
        'withdrew',
      ];

    case 'deposit':
      switch (deposit?.type) {
        case 'cc':
          return [getCardLogo(deposit.card?.network), 'added'];
        case 'moonpay':
          return [moonpay, 'moonpay'];
        case 'circle': {
          switch (deposit.circleType) {
            case 'eth':
              return [ethcoin, 'ethcoin'];

            case 'btc':
              return [bitcoin, 'bitcoin'];

            default:
              return [usdcoin, 'usdcoin'];
          }
        }
        case 'coinbase': {
          return [addedFundsCoinbase, 'coinbase'];
        }
      }
      break;
  }
  return ['', ''];
};
