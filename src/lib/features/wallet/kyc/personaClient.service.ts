import { variables } from '$lib/variables';
import { toast } from '$ui/toast';
import { getPersonalToken } from '$lib/user';
import injectScript from '$util/injectScript';

const personaClients = {};

function getPersonaClient(
  referenceId: string,
  templateId: string,
  onComplete: (inquiryId: string) => void,
  onFailure: () => void
) {
  const client = new Persona.Client({
    templateId,
    environment: variables.persona.environment,
    referenceId,
    fields: {
      tenant: variables.persona.tenantName,
    },
    onLoad: () => {
      client.render();
      // client.open();
    },
    onComplete: ({ inquiryId, status }) => {
      if (status === 'failed') {
        return onFailure();
      }
      return onComplete(inquiryId);
    },
    onError: (error) => {
      if (error) {
        toast.danger('Failed to load the KYC verification form. Please, try again.');
      }
    },
  });
  return client;
}

export async function launchKYCPersona(templateId, onComplete, kycFailure, onFailure) {
  await injectScript({ id: 'persona', url: 'https://cdn.withpersona.com/dist/persona-v4.4.0.js' });
  if (!personaClients[templateId] || kycFailure) {
    personaClients[templateId] = getPersonaClient(await getPersonalToken(), templateId, onComplete, onFailure);
  }
  personaClients[templateId].open();
}
