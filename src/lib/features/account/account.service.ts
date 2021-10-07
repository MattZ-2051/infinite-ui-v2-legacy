import { toast } from '$ui/toast';
import { CLIENT_COMPANY_NAME } from '$project/variables';

export function handleUserApiError(error) {
  let message;
  switch (error?.data?.appCode) {
    case 'USERNAME_RULES_TAKEN':
      message = 'The username you selected is already taken. Please choose a different one.';
      break;
    case 'USERNAME_RULES_TOO_SHORT':
      message = 'Username must have between 3 and 18 characters length.';
      break;
    case 'USERNAME_RULES_WEIRD_CHARS':
      message = 'Username can only contain letters, digits, dashes (-) and underscores (_).';
      break;
    case 'USERNAME_RULES_BLANKS':
      message = 'Username cannot contain blank spaces.';
      break;
    default:
      message = 'There was an error submitting your request. Please try again.';
  }
  toast.danger(message);
}

export const phoneNumberConsentText = `By providing your phone number, you are consenting to receiving updates from ${CLIENT_COMPANY_NAME} on NFT releases,
exclusive experiences, updates and other communications from ${CLIENT_COMPANY_NAME} and its affiliates and partners.`;
