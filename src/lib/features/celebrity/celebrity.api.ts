export async function loadItems({ fetch }) {
  const response = await fetch(
    `https://api.goinfinite.io/skus/tiles/?page=1&per_page=50&sortBy=startDate:1`
  );
  return { items: await response.json() };
}
