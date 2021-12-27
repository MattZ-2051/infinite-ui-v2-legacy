import { toast } from '$ui/toast';

export const kycLevel1ErrorHandler = (error) => {
  switch (error.data.appCode) {
    case 'KYC_NEEDED':
      toast.danger(`You need to complete KYC level 1 in order to withdraw funds.`);
      break;
    default:
      toast.danger(`There was an error with your withdrawal. Please, try again.`);
      break;
  }
};
