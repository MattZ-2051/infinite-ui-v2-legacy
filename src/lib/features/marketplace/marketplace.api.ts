export async function loadCategoriesItems({ fetch }) {
  const [items, categories] = await Promise.all([
    fetch(`https://api.goinfinite.io/skus/tiles/?page=1&per_page=50&sortBy=startDate:1`).then((r) =>
      r.json()
    ),
    fetch(`https://api.goinfinite.io/categories/`).then((r) => r.json()),
  ]);
  return { categories, items };
}
