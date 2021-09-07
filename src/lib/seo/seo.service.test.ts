import type { Sku } from '$lib/sku-item/types';
import type { FileAsset } from '$ui/file';
import { chooseSkuSocialImage } from './seo.service';

describe('chooseSkuSocialImage', () => {
  const imageAsset = { url: '1', type: 'image/jpeg' } as FileAsset;
  const imageAsset2 = { url: '2', type: 'image/png' } as FileAsset;
  const videoAsset = { url: '3', type: 'video/mp4' } as FileAsset;

  it('should pick from social assets', () => {
    expect(
      chooseSkuSocialImage({
        nftSocialAssets: [{ ...imageAsset, platform: 'all' }],
        nftPublicAssets: [imageAsset, imageAsset2, videoAsset],
      } as Sku)
    ).toEqual({ ...imageAsset, platform: 'all' });
  });

  describe('with no `nftSocialAssets`', () => {
    it('should pick the first image', () => {
      expect(chooseSkuSocialImage({ nftPublicAssets: [imageAsset, imageAsset2, videoAsset] } as Sku)).toBe(imageAsset);
      expect(chooseSkuSocialImage({ nftPublicAssets: [imageAsset2, imageAsset, videoAsset] } as Sku)).toBe(imageAsset2);
      expect(chooseSkuSocialImage({ nftPublicAssets: [videoAsset, imageAsset] } as Sku)).toBe(imageAsset);
    });

    it('should ignore assets with missing type', () => {
      expect(chooseSkuSocialImage({ nftPublicAssets: [{}, imageAsset] } as Sku)).toBe(imageAsset);
    });

    it('should handle missing/empty `nftPublicAssets`', () => {
      expect(chooseSkuSocialImage({ nftPublicAssets: [] } as Sku)).toBeUndefined();
      expect(chooseSkuSocialImage({} as Sku)).toBeUndefined();
    });
  });
});
