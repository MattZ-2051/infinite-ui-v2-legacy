<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import NftDetails from './NftDetails.svelte';

  const sourceImg = {
    bucket: 'infinite-digital-dev',
    hash: '8595b86939139199975eccf69d17ec48d33f8fc1d960d376cb2c5887ecba82e3',
    height: 100,
    key: 'moonracer/1.png',
    previewUrl: 'https://infinite-digital-dev.s3.amazonaws.com/moonracer/1_preview_300.png',
    size: 1_336_985,
    type: 'image/png',
    url: 'https://infinite-digital-dev.s3.amazonaws.com/moonracer/1.png',
    width: 100,
  };
</script>

<Meta title="Lib / features / gateKeeping / GateKeeping " component={NftDetails} />

<Template let:args>
  <div class="max-w-5xl" style="height: min(500px, 100%);">
    <NftDetails {...args} {sourceImg} />
  </div>
</Template>

<Story name="Now Viewing" args={{ status: 'nowViewing', showToolTip: false }} />
<Story name="Not Owned" args={{ status: 'notOwnedYet', showToolTip: false }} />
<Story name="Owned" args={{ status: 'owned', showToolTip: false }} />
<Story name="Buy Now" args={{ status: 'buyNow', showToolTip: true }} />
