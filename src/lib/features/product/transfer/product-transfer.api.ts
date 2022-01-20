import type { User } from '$lib/user/types';
import type { Product, Profile } from '$lib/sku-item/types';
import type { AccountData, MirrorNodeBalanceResponse, TransferOutResponse } from '$lib/features/infinite-wallet/types';
import { getPage, patch } from '$lib/api';
import { associateToken, dissociateToken, transferToken } from '$lib/features/infinite-wallet/infinite-wallet.service';

export async function transferProduct(product: Product, to: string) {
  await patch(`products/${product._id}/transfer`, { to }, { skipTenant: true });
}

export async function getUsers({
  username,
  page = 1,
  perPage = 10,
  skipTenant,
}: {
  username: string;
  page: number;
  perPage?: number;
  skipTenant?: boolean;
}): Promise<{ total: number; data: Profile[] }> {
  return getPage<Profile>('users', {
    params: { username, includeFunctions: 'true', page: `${page}`, per_page: `${perPage}` },
    skipTenant: skipTenant,
  });
}

export async function transferProductOut(
  product: Product,
  account: AccountData,
  walletAddress: string
): Promise<TransferOutResponse> {
  let response: TransferOutResponse;
  if (account) {
    await associateToken(product.tokenId, account);
    try {
      response = await patch(`products/${product._id}/wallet-transfer-out`, {
        wallet: account.id,
      });
    } catch (error) {
      if (!product.ownedByExternalWallet) await dissociateToken(product.tokenId, account);
      throw error;
    }
  } else {
    response = await patch(`products/${product._id}/wallet-transfer-out`, {
      wallet: walletAddress,
    });
  }

  return response;
}

export async function transferProductIn(
  product: Product,
  account: AccountData,
  balanceData: MirrorNodeBalanceResponse,
  user: User
): Promise<TransferOutResponse> {
  const transferResult = await transferToken(product, account, balanceData, user);
  const response: TransferOutResponse = await patch(`products/${product._id}/wallet-transfer-in`, {
    hash: transferResult.txHash,
  });

  return response;
}
