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
  export let description: string = CLIENT_DOC_DESCRIPTION;
  /**
   * Use title passed as prop exclusively and don't join with CLIENT_DOC_TITLE
   */
  export let useGivenTitle = false;

  let ogImage: OpenGraphImage;
  $: {
    if (typeof image === 'string') {
      ogImage = { url: image };
    } else {
      const getImage = ({ url, width, height, alt }: OpenGraphImage | (FileAsset & { alt?: string })) => ({
        url,
        width,
        height,
        alt,
      });
      ogImage = getImage(image || DEFAULT_IMAGE);
    }
  }
  $: title = useGivenTitle ? _title : [CLIENT_DOC_TITLE, _title].filter(Boolean).join(' - ');
</script>

<SvelteSeo
  {title}
  {description}
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
