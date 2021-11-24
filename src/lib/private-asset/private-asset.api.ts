import type { FileAsset } from '$ui/file';
import type { CollectorProduct } from '$lib/sku-item/types';
import { getPage, post } from '$lib/api';

export async function getPrivateAssets({
  skuId,
  ownerId,
}: {
  skuId: string;
  ownerId: string;
  page?: number;
}): Promise<{ total: number; assets: FileAsset[]; isOwner: boolean; productId: string }> {
  const responseFileAssets = await getPage<FileAsset>(`skus/${skuId}/private-assets`);
  const responseCollectors =
    ownerId &&
    (await getPage<CollectorProduct>(`products/collectors/${skuId}`, {
      params: { page: '1', per_page: '1', includeFunctions: 'true', ownerId },
    }));

  return {
    total: responseFileAssets.total,
    assets: responseFileAssets.data,
    isOwner: responseFileAssets.data.length > 0,
    productId: (await responseCollectors)?.data[0]?._id,
  };
}

export async function getPreSignedUrl({
  productId,
  key,
  filename,
}: {
  productId: string;
  key: string;
  filename: string;
}): Promise<string> {
  const { presignedUrl } = await post<{ presignedUrl: string }>(`/products/${productId}/private-link`, { key });

  const a = document.createElement('a');
  a.href = presignedUrl;
  a.setAttribute('download', filename);
  a.click();

  return presignedUrl;
}
