export async function loadFeatured({ fetch }) {
  const [skus, products] = await Promise.all([
    await fetch(
      `https://api.goinfinite.io/skus/tiles/?page=1&per_page=8&sortBy=startDate:1`
    ).then((r) => r.json()),
    await fetch(
      `https://api.goinfinite.io/products?owner=60a49610ddc7af020455d316&includeFunctions=true&page=1&per_page=8`
    ).then((r) => r.json()),
  ]);
  return { skus, products };
}
