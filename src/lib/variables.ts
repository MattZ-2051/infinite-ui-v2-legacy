export const variables = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiMocking: import.meta.env.VITE_API_MOCKING === 'enabled',
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
  persona: {
    tenantName: import.meta.env.VITE_KYC_PERSONA_TENANT,
    templateIdLevel1: import.meta.env.VITE_KYC_PERSONA_TEMPLATE_LVL_1,
    templateIdLevel2: import.meta.env.VITE_KYC_PERSONA_TEMPLATE_LVL_2,
    environment: import.meta.env.VITE_KYC_PERSONA_ENVIRONMENT,
  },
  ethNetwork: {
    apiUrl: import.meta.env.VITE_ETHERSCAN_API_URL,
    apiKey: import.meta.env.VITE_ETHERSCAN_API_KEY,
    explorerBaseUrl: import.meta.env.VITE_ETH_EXPLORER_BASE_URL,
    usdcContractAddress: import.meta.env.VITE_USDC_CONTRACT_ADDRESS,
  },
  bitcoinNetwork: {
    apiUrl: import.meta.env.VITE_BLOCKCYPHER_API_URL,
    explorerBaseUrl: import.meta.env.VITE_BTC_EXPLORER_BASE_URL,
  },
  dailyDepositLimit: import.meta.env.VITE_DAILY_DEPOSIT_LIMIT_USD,
  initialBuyersFeePercentage: import.meta.env.INITIAL_BUYERS_FEE_PERCENTAGE / 100 || 0,
};
