<script lang="ts">
  import type { OpenGraphImage } from 'svelte-seo/types/SvelteSeo';
  import type { FileAsset } from '$ui/file';
  import SvelteSeo from 'svelte-seo';

  export const DEFAULT_IMAGE = {
    url: 'https://thearianetwork.com/wp-content/uploads/2021/06/aria_exchange_share_image-01.jpg',
    width: 1216,
    height: 740,
    alt: 'The ARIA Exchange',
  };

  export let title = 'Coming Soon';
  export let image: OpenGraphImage | (FileAsset & { alt?: string }) | string = DEFAULT_IMAGE;

  let ogImage: OpenGraphImage;
  $: ogImage =
    typeof image === 'string'
      ? { url: image }
      : (({ url, width, height, alt }) => ({ url, width, height, alt }))(image || DEFAULT_IMAGE);
</script>

<SvelteSeo
  openGraph={{
    title: [`The ARIA Exchange`, title].filter(Boolean).join(' - '),
    type: 'website',
    images: [ogImage],
  }}
/>
