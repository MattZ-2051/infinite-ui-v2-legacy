import type { User } from '$lib/user/types';
import type { Product, Profile } from '$lib/sku-item/types';
import type { AccountData, MirrorNodeBalanceResponse, TransferOutResponse } from '$lib/features/infinite-wallet/types';
import { get, patch, post } from '$lib/api';
import { associateToken, dissociateToken, transferToken } from '$lib/features/infinite-wallet/infinite-wallet.service';

export async function transferProduct(product: Product, to: string) {
  await patch(`products/${product._id}/transfer`, { to }, { skipTenant: true });
}

export async function getUserByUsername({
  username,
  skipTenant,
}: {
  username: string;
  skipTenant?: boolean;
}): Promise<Profile | null> {
  return get<Profile>(`users/issuers/${username}`, {
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

export async function associateProduct(product: Product) {
  const { tokenId } = product;
  await post('products/token-associate', { tokenId });
  return;
}

export async function transferProductIn(
  product: Product,
  account: AccountData,
  balanceData: MirrorNodeBalanceResponse,
  user: User
): Promise<TransferOutResponse> {
  await associateProduct(product);
  const transferResult = await transferToken(product, account, balanceData, user);
  const response: TransferOutResponse = await patch(`products/${product._id}/wallet-transfer-in`, {
    id: transferResult.txId,
    hash: transferResult.txHash,
  });

  return response;
}
