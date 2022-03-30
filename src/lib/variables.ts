export const variables = {
  apiUrl: import.meta.env.VITE_API_URL,
  persona: {
    tenantName: import.meta.env.VITE_KYC_PERSONA_TENANT,
    templateIdLevel1: import.meta.env.VITE_KYC_PERSONA_TEMPLATE_LVL_1,
    templateIdLevel2: import.meta.env.VITE_KYC_PERSONA_TEMPLATE_LVL_2,
    environment: import.meta.env.VITE_KYC_PERSONA_ENVIRONMENT,
  },
  ethNetwork: {
    apiUrl: import.meta.env.VITE_ETHERSCAN_API_URL,
    explorerBaseUrl: import.meta.env.VITE_ETH_EXPLORER_BASE_URL,
    apiKey: import.meta.env.VITE_ETHERSCAN_API_KEY,
    usdcContractAddress: import.meta.env.VITE_USDC_CONTRACT_ADDRESS,
    nftExplorerUrl: import.meta.env.VITE_ETH_EXPLORER_BASE_URL_NFT,
    nftTransactionApiUrl: import.meta.env.VITE_ETHERSCAN_API_URL_NFT_TX,
  },
  bitcoinNetwork: {
    apiUrl: import.meta.env.VITE_BLOCKCYPHER_API_URL,
    explorerBaseUrl: import.meta.env.VITE_BTC_EXPLORER_BASE_URL,
  },
  dailyDepositLimit: import.meta.env.VITE_DAILY_DEPOSIT_LIMIT_USD,
  maintenance: {
    maintenanceMode: import.meta.env.VITE_MAINTENANCE_MODE,
    maintenanceMessage: import.meta.env.VITE_MAINTENANCE_MESSAGE,
  },
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
  achEnabled: import.meta.env.VITE_ACH_ENABLED === 'true',
  hederaNetwork: import.meta.env.VITE_HEDERA_NETWORK,
  stripe: {
    enabled: import.meta.env?.VITE_STRIPE_ENABLED === 'true',
    pubKey: import.meta.env.VITE_STRIPE_PUBKEY,
  },
  hidePhoneConsent: import.meta.env.VITE_HIDE_PHONE_CONSENT === 'true',
};
