import { variables } from '$lib/variables';
import { toast } from '$ui/toast';
import { getPersonalToken } from '$lib/user';
import injectScript from '$util/injectScript';

const personaClients = {};

function getPersonaClient(referenceId: string, templateId: string, onComplete: (inquiryId: string) => void) {
  const client = new Persona.Client({
    templateId,
    environment: variables.persona.environment,
    referenceId,
    onLoad: (error) => {
      if (error) {
        toast.danger('Failed to load the KYC verification form. Please, try again.');
      }
      client.render();
    },
    onComplete,
  });
  return client;
}

export async function launchKYCPersona(templateId, onComplete) {
  await injectScript({ id: 'persona', url: 'https://cdn.withpersona.com/dist/persona-v3.10.0.js' });
  personaClients[templateId] =
    personaClients[templateId] || getPersonaClient(await getPersonalToken(), templateId, onComplete);
  personaClients[templateId].open();
}
