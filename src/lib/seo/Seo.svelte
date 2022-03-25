<script lang="ts">
  import type { OpenGraphImage } from 'svelte-seo/types/SvelteSeo';
  import type { FileAsset } from '$ui/file';
  import SvelteSeo from 'svelte-seo';
  import { CLIENT_SOCIAL_IMAGE, CLIENT_DOC_TITLE, CLIENT_DOC_DESCRIPTION } from '$project/variables';

  const DEFAULT_IMAGE = CLIENT_SOCIAL_IMAGE;

  let _title = '';
  export { _title as title };

  export let image: OpenGraphImage | (FileAsset & { alt?: string }) | string = DEFAULT_IMAGE;
  export let ogDescription: string = CLIENT_DOC_DESCRIPTION;

  let ogImage: OpenGraphImage;
  $: ogImage =
    typeof image === 'string'
      ? { url: image }
      : (({ url, width, height, alt }) => ({ url, width, height, alt }))(image || DEFAULT_IMAGE);
  $: title = [CLIENT_DOC_TITLE, _title].filter(Boolean).join(' - ');
</script>

<SvelteSeo
  {title}
  openGraph={{
    title,
    description: ogDescription,
    type: 'website',
    images: [ogImage],
  }}
  twitter={{
    card: 'summary_large_image',
    title,
    description: ogDescription,
    image: ogImage.url,
    imageAlt: ogImage.alt,
  }}
/>
