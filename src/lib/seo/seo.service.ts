import type { Profile, Sku, SocialFileAsset } from '$lib/sku-item/types';

export function chooseSkuSocialImage(sku: Sku): SocialFileAsset {
  return getSocialAssetsImage(sku.nftSocialAssets);
}

export function chooseProfileSocialImage(profile: Profile): SocialFileAsset {
  return getSocialAssetsImage(profile.nftSocialAssets);
}

function getSocialAssetsImage(nftSocialAssets: SocialFileAsset[]): SocialFileAsset {
  if (nftSocialAssets?.length > 0) {
    const socialAssets = Object.fromEntries(nftSocialAssets.map((asset) => [asset.platform, asset]));
    return socialAssets.all || socialAssets.facebook || socialAssets.twitter;
  }
}
