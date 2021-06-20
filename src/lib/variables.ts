export const variables = {
  apiUrl: import.meta.env.VITE_API_URL,
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
  persona: {
    templateId: import.meta.env.VITE_KYC_PERSONA_TEMPLATE,
    environment: import.meta.env.VITE_KYC_PERSONA_ENVIRONMENT,
  },
};
