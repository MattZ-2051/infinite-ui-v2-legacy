/// <reference types="@sveltejs/kit" />

interface CommonImportMetaEnvironment {
  VITE_API_URL: string;
  VITE_API_MOCKING: 'enabled' | '';
  VITE_KYC_PERSONA_TENANT: string;
  VITE_KYC_PERSONA_TEMPLATE_LVL_1: string;
  VITE_KYC_PERSONA_TEMPLATE_LVL_2: string;
  VITE_KYC_PERSONA_ENVIRONMENT: string;
  VITE_DAILY_DEPOSIT_LIMIT_USD: number;
  VITE_USDC_CONTRACT_ADDRESS: string;
  VITE_ETHERSCAN_API_URL_GOERLI: string;
  VITE_ETHERSCAN_API_URL_RINKEBY: string;
  VITE_ETHERSCAN_API_KEY: string;
  VITE_ETH_EXPLORER_BASE_URL_GOERLI: string;
  VITE_ETH_EXPLORER_BASE_URL_RINKEBY: string;
  VITE_BLOCKCYPHER_API_URL: string;
  VITE_BTC_EXPLORER_BASE_URL: string;
  VITE_AWS_COGNITO_LOGIN_DOMAIN: string;
  VITE_AWS_COGNITO_CLIENT_ID: string;
  VITE_AWS_COGNITO_CLIENT_SECRET: string;
  VITE_AWS_COGNITO_STATE_CIPHER_KEY: string;
  VITE_MAINTENANCE_MODE: string;
  VITE_MAINTENANCE_MESSAGE: string;
  VITE_ACH_ENABLED: string;
  VITE_AUTH0_DOMAIN: string;
  VITE_AUTH0_CLIENT_ID: string;
  VITE_AUTH0_AUDIENCE: string;
  VITE_OPENSEA_URL: string;
  VITE_OPENSEA_URL_NFT_MINTED: string;
  VITE_LOW_KYC_LVL_DEPOSIT_LIMIT_USD: number;
  VITE_MM_WALLET_ENABLED: string;
  VITE_HIDE_PHONE_CONSENT: string;
  VITE_ENABLE_CHECKOUT: string;
}

declare module '*format=avif;webp;png&metadata=src;format;width;height';
declare module '*format=avif;webp;jpeg&metadata=src;format;width;height';
declare module '*format=avif;webp;jpg&metadata=src;format;width;height';

type SvelteAction = (node: HTMLElement | SVGSVGElement, parameters?: unknown) => SvelteActionReturn;

type SvelteActionReturn = {
  update?: (updateParameters?: unknown) => void;
  destroy?: () => void;
} | void;

type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

declare namespace App {
  interface Session {
    user?: { username: string; externalId: string };
    expiration?: number;
    invalid?: boolean;
    expired?: boolean;
  }
}
