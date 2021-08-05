import { variables } from '$lib/variables';
import { toast } from '$ui/toast';
import { getPersonalToken } from '$lib/user';
import injectScript from '$util/injectScript';
import { loadWalletFx } from '../wallet.store';

let personaClient;

function getPersonaClient(referenceId: string) {
  const client = new Persona.Client({
    templateId: variables.persona.templateId,
    environment: variables.persona.environment,
    referenceId,
    onLoad: (error) => {
      if (error) {
        toast.danger('Failed to load the KYC verification form. Please, try again.');
      }
      client.render();
    },
    // onStart: (inquiryId) => {}
    onComplete: (/*inquiryId*/) => loadWalletFx(),
    // onEvent: (name, meta) => {}
  });
  return client;
}

export async function launchKYCPersona() {
  await injectScript({ id: 'persona', url: 'https://cdn.withpersona.com/dist/persona-v3.10.0.js' });
  personaClient = personaClient || getPersonaClient(await getPersonalToken());
  personaClient.open();
}
