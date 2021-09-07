import type { Profile, Sku, SocialFileAsset } from '$lib/sku-item/types';

export function chooseSkuSocialImage(sku: Sku) {
  return getSocialAssetsImage(sku.nftSocialAssets) || sku.nftPublicAssets?.find((item) => item.type?.includes('image'));
}

export function chooseProfileSocialImage(profile: Profile) {
  return (
    getSocialAssetsImage(profile.nftSocialAssets) ||
    profile.profilePhotoUrls?.find((item) => item.position === '2') ||
    profile.bannerPhotoUrl
  );
}

function getSocialAssetsImage(nftSocialAssets: SocialFileAsset[]) {
  if (nftSocialAssets?.length > 0) {
    const socialAssets = Object.fromEntries(nftSocialAssets.map((asset) => [asset.platform, asset]));
    return socialAssets.all || socialAssets.facebook || socialAssets.twitter;
  }
}
