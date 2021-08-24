<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import FilePreview from './FilePreview.svelte';

  const imageAsset = {
    bucket: 'infinite-digital-dev',
    hash: '8595b86939139199975eccf69d17ec48d33f8fc1d960d376cb2c5887ecba82e3',
    height: 667,
    key: 'moonracer/1.png',
    previewUrl: 'https://infinite-digital-dev.s3.amazonaws.com/moonracer/1_preview_300.png',
    size: 1_336_985,
    type: 'image/png',
    url: 'https://infinite-digital-dev.s3.amazonaws.com/moonracer/1.png',
    width: 1000,
  };

  const videoAsset = {
    bucket: 'infinite-digital-prod',
    hash: '8409340a988c563c2adc846bb658a6bc27005e07aeb7d533a4d3e5ff32d40169',
    height: 720,
    key: 'spencer/releases/July22drop1/public/rainbow_comp_v012.mp4',
    size: 20_364_759,
    type: 'video/mp4',
    url: 'https://infinite-digital-prod.s3.amazonaws.com/spencer/releases/July22drop1/public/rainbow_comp_v012.mp4',
    width: 720,
  };
</script>

<Meta title="UI / File / FilePreview" component={FilePreview} />

<Template let:args>
  <div class="w-96 h-96">
    <FilePreview {...args} />
  </div>
</Template>

<Story name="Image" args={{ item: imageAsset }} />
<Story name="Video" args={{ item: videoAsset }} parameters={{ chromatic: { disableSnapshot: true } }} />
