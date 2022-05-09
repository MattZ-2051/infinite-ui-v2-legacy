import type { FileAsset } from '$ui/file';
import type { CollectorProduct, Product } from '$lib/sku-item/types';
import { get, getPage, post } from '$lib/api';

export async function getPrivateAssets({
  skuId,
  ownerId,
}: {
  skuId: string;
  ownerId: string;
  page?: number;
}): Promise<{ total: number; assets: FileAsset[]; isOwner: boolean; productId: string }> {
  try {
    const [responseFileAssets, responseCollectors] = await Promise.all([
      getPage<FileAsset>(`skus/${skuId}/private-assets`),
      ownerId &&
        getPage<CollectorProduct>(`products/collectors/${skuId}`, {
          params: { page: '1', per_page: '1', includeFunctions: 'true', ownerId },
        }),
    ]);

    return {
      total: responseFileAssets?.total,
      assets: responseFileAssets?.data,
      isOwner: responseCollectors?.data.length > 0,
      productId: responseCollectors?.data[0]?._id,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return;
  }
}

export async function getProductPrivateAssets({
  productId,
  ownerId,
  page,
}: {
  productId: string;
  ownerId: string;
  page?: number;
}): Promise<{ total: number; assets: FileAsset[]; isOwner?: boolean }> {
  try {
    const [responseFileAssets, responseProduct] = await Promise.all([
      getPage<FileAsset>(`products/${productId}/private-assets`, { params: page ? { page: `${page}` } : {} }),
      ownerId && get<Product>(`products/${productId}`),
    ]);

    return {
      total: responseFileAssets?.total,
      assets: responseFileAssets?.data,
      isOwner: ownerId ? responseProduct?.owner._id === ownerId : false,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }
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
