<script lang="ts">
  import type { OpenGraphImage } from 'svelte-seo/types/SvelteSeo';
  import type { FileAsset } from '$ui/file';
  import SvelteSeo from 'svelte-seo';
  import { CLIENT_SOCIAL_IMAGE, CLIENT_DOC_TITLE } from '$scope/variables';

  const DEFAULT_IMAGE = CLIENT_SOCIAL_IMAGE;

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
    title: [CLIENT_DOC_TITLE, title].filter(Boolean).join(' - '),
    type: 'website',
    images: [ogImage],
  }}
/>
