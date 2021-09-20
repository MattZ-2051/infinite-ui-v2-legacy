/// <reference types="@sveltejs/kit" />

interface CommonImportMetaEnvironment {
  VITE_API_URL: string;
  VITE_API_MOCKING: 'enabled' | '';
  VITE_KYC_PERSONA_TENANT: string;
  VITE_KYC_PERSONA_TEMPLATE_LVL_1: string;
  VITE_KYC_PERSONA_TEMPLATE_LVL_2: string;
  VITE_KYC_PERSONA_ENVIRONMENT: string;
  VITE_AUTH0_DOMAIN: string;
  VITE_AUTH0_CLIENT_ID: string;
  VITE_AUTH0_AUDIENCE: string;
  VITE_DAILY_DEPOSIT_LIMIT_USD: number;
  INITIAL_BUYERS_FEE_PERCENTAGE: number;
  VITE_USDC_CONTRACT_ADDRESS: string;
  VITE_ETHERSCAN_API_URL: string;
  VITE_ETHERSCAN_API_KEY: string;
  VITE_ETH_EXPLORER_BASE_URL: string;
  VITE_BLOCKCYPHER_API_URL: string;
  VITE_BTC_EXPLORER_BASE_URL: string;
}

declare module '*format=avif;webp;png&metadata';
declare module '*format=avif;webp;jpeg&metadata';
declare module '*format=avif;webp;jpg&metadata';

type SvelteAction = (node: HTMLElement | SVGSVGElement, parameters?: unknown) => SvelteActionReturn;

type SvelteActionReturn = {
  update?: (updateParameters?: unknown) => void;
  destroy?: () => void;
} | void;

type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;
