/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_KYC_PERSONA_TEMPLATE: string;
  VITE_KYC_PERSONA_ENVIRONMENT: string;
  VITE_AUTH0_DOMAIN: string;
  VITE_AUTH0_CLIENT_ID: string;
  VITE_AUTH0_AUDIENCE: string;
  VITE_COINBASE_CHECKOUT_ID: string;
  VITE_USDC_ADDRESS: string;
  VITE_USDC_API_URL: string;
  VITE_USDC_API_KEY: string;
  VITE_USDC_TX_URL: string;
}

declare module '*format=avif;webp;png&metadata';
declare module '*format=avif;webp;jpeg&metadata';

type SvelteAction = (node: HTMLElement | SVGSVGElement, parameters?: unknown) => SvelteActionReturn;

type SvelteActionReturn = {
  update?: (updateParameters?: unknown) => void;
  destroy?: () => void;
} | void;

type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;
