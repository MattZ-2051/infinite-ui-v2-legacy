<script context="module" lang="ts">
  const KNOWN_EXTENSIONS = {
    avif: { type: 'image/avif' },
    webp: { type: 'image/webp' },
    jpeg: { type: 'image/jpeg' },
    jpg: { type: 'image/jpg' },
    png: { type: 'image/png' },
  };

  type EXT = keyof typeof KNOWN_EXTENSIONS;
  const order: EXT[] = ['avif', 'webp', 'jpeg', 'jpg', 'png'];
</script>

<script lang="ts">
  export let src: string[] = [];
  export let alt = '';
  export let loading: 'eager' | 'lazy' | 'auto' = 'lazy';

  let fallback: string;
  let images: { path: string; type: string }[];

  function getSources(paths: string[]) {
    const [fallback, ...images] = paths.sort(function (a, b) {
      const A = a.split('.').pop() as EXT;
      const B = b.split('.').pop() as EXT;

      if (order.indexOf(A) > order.indexOf(B)) {
        return -1;
      } else {
        return 1;
      }
    });

    return {
      fallback,
      images: images.reverse().map((path) => {
        const ext = path.split('.').pop() as EXT;
        return { path, type: KNOWN_EXTENSIONS[ext]?.type };
      }),
    };
  }

  $: sources = getSources(src);
  $: fallback = sources.fallback;
  $: images = sources.images;
</script>

<picture>
  {#each images as image}
    <source srcset={image.path} type={image.type} />
  {/each}
  <img src={fallback} {alt} {loading} {...$$restProps} />
</picture>
