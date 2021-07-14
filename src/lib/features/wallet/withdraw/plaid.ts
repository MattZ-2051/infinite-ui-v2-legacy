import injectScript from '$util/injectScript';

export type PlaidLinkToken = string;

export type PlaidPublicToken = string;

export type PlaidSuccessMetadata = {
  institution: {
    name: string;
    institution_id: string;
  };
  accounts: [
    {
      id: string;
      name: string;
      mask: string;
      type: string;
      subtype: string;
      verification_status:
        | 'pending_automatic_verification'
        | 'pending_manual_verification'
        | 'automatically_verified'
        | 'manually_verified'
        | 'verification_expired'
        | 'verification_failed';
    }
  ];
  link_session_id: string;
};

export type PlaidOnSuccess = (token: PlaidPublicToken, metadata: PlaidSuccessMetadata) => void;

export type PlaidError = {
  error_type: string;
  error_code: string;
  error_message: string;
  display_message: string;
};

export type PlaidErrorMetadata = {
  institution: {
    name: string;
    institution_id: string;
  };
  status:
    | 'requires_questions'
    | 'requires_selections'
    | 'requires_code'
    | 'choose_device'
    | 'requires_credentials'
    | 'requires_oauth'
    | 'institution_not_found';
  link_session_id: string;
  request_id: string;
};
export type PlaidOnExit = (error: PlaidError, metadata: PlaidErrorMetadata) => void;

export type PlaidEventName =
  | 'CLOSE_OAUTH'
  | 'ERROR'
  | 'EXIT'
  | 'FAIL_OAUTH'
  | 'HANDOFF'
  | 'MATCHED_SELECT_INSTITUTION'
  | 'MATCHED_SELECT_VERIFY_METHOD'
  | 'OPEN'
  | 'OPEN_MY_PLAID'
  | 'OPEN_OAUTH'
  | 'SEARCH_INSTITUTION'
  | 'SELECT_BRAND'
  | 'SELECT_INSTITUTION'
  | 'SUBMIT_CREDENTIALS'
  | 'SUBMIT_MFA'
  | 'TRANSITION_VIEW';

export type PlaidEventMetadata = {
  error_type: string;
  error_code: string;
  error_message: string;
  exit_status: string;
  institution_id: string;
  institution_name: string;
  institution_search_query: string;
  institution_mfa_type: string;
  view_name:
    | 'CONNECTED'
    | 'CONSENT'
    | 'CREDENTIAL'
    | 'ERROR'
    | 'EXIT'
    | 'LOADING'
    | 'MATCHED_CONSENT'
    | 'MATCHED_CREDENTIAL'
    | 'MATCHED_MFA'
    | 'MFA'
    | 'NUMBERS'
    | 'RECAPTCHA'
    | 'SELECT_ACCOUNT'
    | 'SELECT_BRAND'
    | 'SELECT_INSTITUTION';
  request_id: string;
  link_session_id: string;
  timestamp: string;
  selection: string;
};

export type PlaidOnEvent = (eventName: PlaidEventName, metadata: PlaidEventMetadata) => void;

export async function openPlaid(
  token: PlaidLinkToken,
  onOpen: () => void,
  onSuccess: PlaidOnSuccess,
  onExit: PlaidOnExit
): Promise<() => void> {
  if (!window) {
    return;
  }

  await injectScript({ id: 'plaid', url: 'https://cdn.plaid.com/link/v2/stable/link-initialize.js' });

  const plaid = window['Plaid'].create({
    token,
    onSuccess,
    onExit,
    onEvent: (eventName: PlaidEventName, metadata: PlaidErrorMetadata) => {
      if (eventName === 'OPEN') {
        onOpen();
      }
    },
  });

  plaid.open();

  return () => {
    plaid.exit({ force: true });

    plaid.destroy();
  };
}
