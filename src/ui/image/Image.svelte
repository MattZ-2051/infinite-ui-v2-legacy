<script context="module" lang="ts">
  import type { EXT } from './types';

  export type ImageMetadata = {
    format: EXT;
    width: number;
    height: number;
    src: string;
  };

  const order: EXT[] = ['avif', 'webp', 'jpeg', 'jpg', 'png'];

  const groupBy: { <T>(xs: T[], key: string): { [key: string]: T[] } } = function (xs, key) {
    // eslint-disable-next-line unicorn/prefer-object-from-entries
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const sortByExtension = function (a, b) {
    const A = a.split('.').pop() as EXT;
    const B = b.split('.').pop() as EXT;

    return order.indexOf(A) > order.indexOf(B) ? -1 : 1;
  };
</script>

<script lang="ts">
  import { KNOWN_EXTENSIONS } from './types';

  // eslint-disable-next-line unicorn/prevent-abbreviations
  export let src: ImageMetadata[] = [];
  export let sizes = '(max-width: 1000px) 100vw, 1000px';
  export let alt = '';
  export let loading: 'eager' | 'lazy' | 'auto' = 'lazy';
  export let decoding: 'async' | 'sync' | 'auto' = 'async';
  export let setDimensions = true;

  function getSources(imagesMetadata: ImageMetadata[]) {
    const formatMap = groupBy<ImageMetadata>(imagesMetadata, 'format');
    let [_fallback, ..._formats] = Object.keys(formatMap).sort(sortByExtension) as EXT[];
    const _sizes = formatMap[_fallback].map((image) => image.width).sort((a, b) => a - b);

    return {
      fallback: _fallback,
      formats: _formats,
      sizes: _sizes,
      byFormatGroups: formatMap,
    };
  }

  let images: {
    fallback: EXT;
    formats: EXT[];
    sizes: number[];
    byFormatGroups: { [key: string]: ImageMetadata[] };
  };
  $: images = getSources(src);

  let sources: { srcset: string; type: string }[];
  $: sources = images.formats.reverse().map((format) => {
    return {
      srcset: getSrcset(images.byFormatGroups[format]),
      type: KNOWN_EXTENSIONS[format].type,
    };
  });
  $: fallbackAttrs = getFallbackAttributes(images.byFormatGroups[images.fallback]);

  function getSrcset(imagesMetadata: ImageMetadata[]) {
    return imagesMetadata
      .sort((a, b) => a.width - b.width)
      .map((image) => {
        return `${image.src} ${image.width}w`;
      })
      .join(', ');
  }

  function getFallbackAttributes(fallbackImages: ImageMetadata[]) {
    const image = fallbackImages.sort((a, b) => a.width - b.width).reverse()[0];
    const attributes: { srcset: string; src: string; width?: number; height?: number } = {
      srcset: getSrcset(fallbackImages),
      src: image.src,
    };

    if (setDimensions) {
      attributes.width = image.width;
      attributes.height = image.height;
    }
    return attributes;
  }
</script>

<picture>
  {#each sources as source}
    <source srcset={source.srcset} type={source.type} />
  {/each}
  <img {...fallbackAttrs} {alt} {loading} {decoding} {sizes} {...$$restProps} />
</picture>
