declare namespace Persona {
  declare interface InquiryOptions {
    /**
     * Required when resuming inquiries.
     */
    inquiryId?: string;
    /**
     * Required when resuming pending inquiries.
     */
    accessToken?: string;
    /**
     * Required when creating inquiries.
     */
    templateId?: string;
    /**
     * Defaults to 'production'.
     */
    environment?: 'sandbox' | 'production' | string;
    /**
     * Controls location from where the Persona iframe is sourced. For testing
     * only. Defaults to 'production'.
     * To use the 'development' option, your organization must include localhost
     * as an allowed-host.
     */
    host?: 'development' | 'staging' | 'production' | string;
    referenceId?: string;
    accountId?: string;
    language?: string;
    fields?: InquiryAttributes;
    lockedAttributes?: InquiryAttributes;
    onLoad?: () => void;
    onReady?: () => void;
    onError?: (error: InquiryError | undefined) => void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onComplete?: (parameters: { inquiryId: string; status: 'failed' | string; fields: InquiryAttributes }) => void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onEvent?: (name: Event, metadata: {}) => void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onCancel?: (error: InquiryError | undefined, metadata: {}) => void;
  }

  declare interface InquiryAttributes {
    nameFirst?: string;
    nameLast?: string;
    birthdate?: string;
    addressStreet1?: string;
    addressStreet2?: string;
    addressCity?: string;
    addressSubdivision?: string;
    addressPostalCode?: string;
    countryCode?: string;
    phoneNumber?: string;
    emailAddress?: string;
    identificationNumber?: string;
    tenant?: string;
  }
  declare interface InquiryError {
    status: number;
    code: string;
    message: string;
  }

  declare class Client {
    private options;
    private _isLoading;
    private _isOpen;
    private containerId;
    private container;
    private refIframe;
    constructor(options: InquiryOptions);
    render(): void;
    open(): void;
    exit(force: boolean): void;
    private onLoad;
    private onReady;
    private onComplete;
    private onFail;
    private onExit;
    get isLoading(): boolean;
    get isOpen(): boolean;
    /**
     * Gets the base URL for iframe communication. If the URL does not match the
     * iframe origin, messages posted from persona-verify will be ignored by
     * persona-web.
     */
    get baseUrl(): BaseUrl;
  }
}
