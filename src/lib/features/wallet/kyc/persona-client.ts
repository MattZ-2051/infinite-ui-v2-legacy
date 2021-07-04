import { variables } from '$lib/variables';

export interface PersonaClientOptions {
  referenceId: string;
  onLoadError: (argument0: unknown) => unknown;
  onComplete: (argument0: string) => unknown;
  onStart?: (argument0: string) => unknown;
  onEvent?: (argument0: Event, argument1: unknown) => unknown;
}

export function getPersonaClient({
  referenceId,
  onLoadError,
  onComplete,
  onStart,
  onEvent,
}: PersonaClientOptions): Persona.Client {
  const client = new Persona.Client({
    templateId: variables.persona.templateId,
    environment: variables.persona.environment,
    referenceId,
    onLoad: (error) => {
      onLoadError(error);

      client.render();
    },
    onStart: (inquiryId) => {
      if (onStart) {
        onStart(inquiryId);
      }
    },
    onComplete: (inquiryId) => {
      onComplete(inquiryId);
    },
    onEvent: (name, meta) => {
      if (onEvent) {
        onEvent(name, meta);
      }
    },
  });

  return client;
}
