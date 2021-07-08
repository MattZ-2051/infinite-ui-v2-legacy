import type { FileAsset } from '$ui/file';
import type { Collector } from '$lib/sku-item/types';
import { getPage, post } from '$lib/api';

export async function getPrivateAssets({
  skuId,
  ownerId,
}: {
  skuId: string;
  ownerId: string;
  page?: number;
}): Promise<{ total: number; assets: FileAsset[]; isOwner: boolean; productId: string }> {
  const [{ total, data: assets }, { data }] = await Promise.all([
    getPage<FileAsset>(`skus/${skuId}/private-assets`),
    getPage<Collector>(`products/collectors/${skuId}`, {
      params: { page: '1', per_page: '1', includeFunctions: 'true', owner: ownerId },
    }),
  ]);

  return { total, assets, isOwner: data.length > 0, productId: data[0]?._id };
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
