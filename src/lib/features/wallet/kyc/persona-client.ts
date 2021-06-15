export interface PersonaClientOptions {
  referenceId: string;
  onLoadError: (unknown) => unknown;
  onComplete: (string) => unknown;
  onStart?: (string) => unknown;
  onEvent?: (string, unknown) => unknown;
}

export function getPersonaClient({
  referenceId,
  onLoadError,
  onComplete,
  onStart,
  onEvent,
}: PersonaClientOptions): Persona.Client {
  const client = new Persona.Client({
    templateId: import.meta.env.VITE_KYC_PERSONA_TEMPLATE,
    environment: import.meta.env.VITE_KYC_PERSONA_ENVIRONMENT,
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
