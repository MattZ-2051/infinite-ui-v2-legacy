import type { ImageMetadata } from '$ui/image/Image.svelte';
// import Circle from './circle-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
import { variables } from '$lib/variables';
import MoonPay from './moonpay-avatar-2.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
import BitCoin from './bitcoin-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
import EthCoin from './ethcoin-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
import USDCoin from './usdcoin-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
import Suku from './suku-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';
import Hbar from './hbar-avatar.png?w=48&format=avif;webp;png&metadata=src;format;width;height';

export type DepositOption = {
  id: 'circle' | 'usdc' | 'suku' | 'hbar' | 'eth' | 'btc' | 'usDollar' | 'moonpay';
  title: string;
  subtitle: string;
  image: ImageMetadata[];
  disabled?: boolean;
};

const options: DepositOption[] = [
  // { id: 'circle', title: 'Credit Card', subtitle: 'Deposit funds using a credit card', image: Circle },
  { id: 'btc', title: 'BTC', subtitle: 'Deposit funds using BTC', image: BitCoin },
  { id: 'eth', title: 'ETH', subtitle: 'Deposit funds using ETH', image: EthCoin },
  { id: 'usdc', title: 'USDC', subtitle: 'Deposit funds using USDC', image: USDCoin },
  { id: 'hbar', title: 'HBAR', subtitle: 'Deposit funds using HBAR', image: Hbar },
  { id: 'suku', title: 'SUKU', subtitle: 'Coming soon', image: Suku, disabled: true },
];

export const depositOptions: DepositOption[] = variables.achEnabled
  ? [
      // { id: 'circle', title: 'Credit Card', subtitle: 'Deposit funds using a credit card', image: Circle },
      {
        id: 'moonpay',
        title: 'Credit Card',
        subtitle: 'Use MoonPay to deposit funds using a credit card',
        image: MoonPay,
      },
      ...options,
    ]
  : options;
