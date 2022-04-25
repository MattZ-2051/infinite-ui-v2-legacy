import type { Listing } from '$lib/sku-item/types';
import { handleWalletConnection } from '$lib/metamask';
import { onSignIn } from '$lib/user';
import routes from '$project/routes';
import { toast } from '$ui/toast';

export const placeBidFxErrorHandler = (error, listing: Listing) => {
  switch (error.data.appCode) {
    case 'NO_BIG_ENOUGH_BID':
      toast.danger(
        `The bid amount needs to be at least $${listing.auctionBidIncrement} more than the highest bid. Please place a higher bid.`
      );
      break;
    case 'NO_ENOUGH_BALANCE':
      toast.danger(
        `Whoops! You don't have sufficient funds in your wallet! Your available balance is not enough to cover the bid and marketplace fee. <a href=${routes.wallet} class="font-bold">Click here</a> to deposit more funds.`
      );
      break;
    default:
      toast.danger(
        `Whoops, something went wrong.  Please, try again or <a href=${routes.help} class="font-bold">contact support</a> if this issue continues.`
      );
      break;
  }
};

export const showBidLoginToast = (content = 'sign in', data = 'signIn') => {
  toast.danger(`Please <a data-toast="${data}" class="cursor-pointer font-bold">${content}</a> to place a bid.`, {
    onClick: {
      signIn: onSignIn,
      externalWallet: handleWalletConnection,
    },
    toastId: 'ORDER_ERROR_LOGIN',
  });
};
