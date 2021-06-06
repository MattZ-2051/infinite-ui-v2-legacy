<script context="module" lang="ts">
  import type { EXT } from './types';

  const order: EXT[] = ['avif', 'webp', 'jpeg', 'jpg', 'png'];

  const groupBy: { <T>(xs: T[], key: string): { [key: string]: T[] } } = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const sortByExtension = function (a, b) {
    const A = a.split('.').pop() as EXT;
    const B = b.split('.').pop() as EXT;

    if (order.indexOf(A) > order.indexOf(B)) {
      return -1;
    } else {
      return 1;
    }
  };
</script>

<script lang="ts">
  import { KNOWN_EXTENSIONS } from './types';
  type ImageMetadata = {
    format: EXT;
    width: number;
    src: string;
  };

  export let src: ImageMetadata[] = [];
  export let sizes = '(max-width: 1000px) 100vw, 1000px';
  export let alt = '';
  export let loading: 'eager' | 'lazy' | 'auto' = 'lazy';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';

  let images: {
    fallback: EXT;
    formats: EXT[];
    sizes: number[];
    byFormatGroups: { [key: string]: ImageMetadata[] };
  };

  function getSources(images: ImageMetadata[]) {
    const formatMap = groupBy<ImageMetadata>(images, 'format');
    let [_fallback, ..._formats] = Object.keys(formatMap).sort(sortByExtension) as EXT[];
    const _sizes = formatMap[_fallback].map((e) => e.width).sort((a, b) => a - b);

    return {
      fallback: _fallback,
      formats: _formats,
      sizes: _sizes,
      byFormatGroups: formatMap,
    };
  }

  $: images = getSources(src);

  let sources: { srcset: string; type: string }[];
  $: sources = images.formats.reverse().map((format) => {
    return {
      srcset: getSrcset(images.byFormatGroups[format]),
      type: KNOWN_EXTENSIONS[format].type,
    };
  });
  $: fallbackSource = {
    srcset: getSrcset(images.byFormatGroups[images.fallback]),
    type: KNOWN_EXTENSIONS[images.fallback].type,
  };

  function getSrcset(images: ImageMetadata[]) {
    return images
      .sort((a, b) => a.width - b.width)
      .map((image) => {
        return `${image.src} ${image.width}w`;
      })
      .join(', ');
  }

  function getFallbackImage(srcset: string) {
    return srcset.split(' ')[0];
  }
</script>

<picture>
  {#each sources as source}
    <source srcset={source.srcset} type={source.type} />
  {/each}
  <img
    srcset={fallbackSource.srcset}
    src={getFallbackImage(fallbackSource.srcset)}
    {alt}
    {loading}
    {decoding}
    {sizes}
    {...$$restProps}
  />
</picture>
