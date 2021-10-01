import { toast } from '$ui/toast';

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
      message = 'Username can only contain letters, digits and special characters.';
      break;
    case 'USERNAME_RULES_BLANKS':
      message = 'Username cannot contain blank spaces.';
      break;
    default:
      message = 'There was an error submitting your request. Please try again.';
  }
  toast.danger(message);
}
