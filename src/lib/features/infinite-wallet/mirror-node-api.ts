import type { MirrorNodeBalanceResponse, MirrorNodeBalanceToken, MirrorNodeNftResponse } from './types';
import { get, fetchTracker } from '$lib/api';
import { variables } from '$lib/variables';
import { toast } from '$ui/toast';

const MIRRORHOSTS = {
  mainnet: 'https://mainnet-public.mirrornode.hedera.com',
  testnet: 'https://testnet.mirrornode.hedera.com',
  previewnet: 'https://previewnet.mirrornode.hedera.com',
};

export const loadingTokenData = fetchTracker();

export async function getMirrorTokenBalance({
  walletId,
  fetch,
}: {
  walletId: string;
  fetch?: Fetch;
}): Promise<MirrorNodeBalanceResponse> {
  try {
    let response = await get<MirrorNodeBalanceResponse>(
      `${MIRRORHOSTS[variables.hederaNetwork as string]}/api/v1/tokens?account.id=${walletId}`,
      {
        fetch,
      }
    );

    while (response?.links?.next) {
      const { tokens, links } = await get<MirrorNodeBalanceResponse>(
        `${MIRRORHOSTS[variables.hederaNetwork as string]}${response.links.next}`,
        {
          fetch,
        }
      );
      response = { tokens: [...response.tokens, ...tokens], links };
    }
    return response;
  } catch {
    toast.danger('There was an error loading balance data for the Infinite Extension wallet.');
  }
}

export async function getNftBalance({
  nfts,
  walletId,
  fetch,
}: {
  nfts: MirrorNodeBalanceToken[];
  walletId: string;
  fetch?: Fetch;
}): Promise<MirrorNodeNftResponse[]> {
  if (!nfts?.length) return;
  try {
    return Promise.all(
      nfts.map(({ token_id }) =>
        get<MirrorNodeNftResponse>(
          `${MIRRORHOSTS[variables.hederaNetwork as string]}/api/v1/tokens/${token_id}/nfts?account.id=${walletId}`,
          {
            fetch,
          }
        )
      )
    );
  } catch {
    toast.danger('There was an error loading NFT data for the Infinite Extension wallet.');
  }
}
