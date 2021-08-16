export const variables = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiMocking: import.meta.env.VITE_API_MOCKING === 'enabled',
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
  persona: {
    templateId: import.meta.env.VITE_KYC_PERSONA_TEMPLATE,
    environment: import.meta.env.VITE_KYC_PERSONA_ENVIRONMENT,
  },
  coinbase: {
    checkoutId: import.meta.env.VITE_COINBASE_CHECKOUT_ID,
  },
  usdc: {
    address: import.meta.env.VITE_USDC_ADDRESS,
    apiUrl: import.meta.env.VITE_USDC_API_URL,
    apiKey: import.meta.env.VITE_USDC_API_KEY,
    txUrl: import.meta.env.VITE_USDC_TX_URL,
  },
  dailyDepositLimit: import.meta.env.VITE_DAILY_DEPOSIT_LIMIT_USD,
};
