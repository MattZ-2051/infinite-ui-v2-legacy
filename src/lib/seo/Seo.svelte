<script lang="ts">
  import type { OpenGraphImage } from 'svelte-seo/types/SvelteSeo';
  import type { FileAsset } from '$ui/file';
  import SvelteSeo from 'svelte-seo';
  import { CLIENT_SOCIAL_IMAGE, CLIENT_DOC_TITLE } from '$project/variables';

  const DEFAULT_IMAGE = CLIENT_SOCIAL_IMAGE;

  let _title = '';
  export { _title as title };

  export let image: OpenGraphImage | (FileAsset & { alt?: string }) | string = DEFAULT_IMAGE;

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
    type: 'website',
    images: [ogImage],
  }}
/>
