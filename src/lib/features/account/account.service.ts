import * as yup from 'yup';
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
    case 'NAMES_RULES_WEIRD_CHARS':
      message = `First and last name can only contain letters and spaces.`;
      break;
    default:
      message = 'There was an error submitting your request. Please try again.';
  }
  toast.danger(message);
}

export const phoneNumberConsentText = `Stay in the loop on all the hottest releases! By providing your phone number, 
you’re consenting to receiving SMS updates from ${CLIENT_COMPANY_NAME} on all of the exciting updates and experiences from us and from our partners.
Your phone number will not be shared publicly on your marketplace profile.`;

export const accountDetailsValidation = {
  firstName: yup
    .string()
    .required('First name is required.')
    .max(20, 'First name is too long.')
    .matches(/^[ a-z]+$/i, {
      message: 'First name can only contain letters and spaces.',
      excludeEmptyString: true,
    }),
  lastName: yup
    .string()
    .required('Last name is required.')
    .max(20, 'Last name is too long.')
    .matches(/^[ a-z]+$/i, {
      message: 'Last name can only contain letters and spaces.',
      excludeEmptyString: true,
    }),
  phoneNumber: yup
    .string()
    .nullable()
    .matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid phone number.', excludeEmptyString: true })
    .optional(),
};
