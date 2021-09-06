import type { Profile, Sku } from '$lib/sku-item/types';

export function chooseSkuSocialImage(sku: Sku) {
  return sku.nftPublicAssets?.find((item) => item.type?.includes('image'));
}

export function chooseProfileSocialImage(profile: Profile) {
  if (profile.nftSocialAssets?.length > 0) {
    const socialAssets = Object.fromEntries(
      profile.nftSocialAssets.map(({ platform, ...rest }) => {
        return [platform, rest];
      })
    );
    return socialAssets.all || socialAssets.facebook || socialAssets.twitter;
  }

  return profile.profilePhotoUrls?.find((item) => item.position === '2') || profile.bannerPhotoUrl;
}
