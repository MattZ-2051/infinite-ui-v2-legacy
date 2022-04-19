<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Gallery from './Gallery.svelte';

  const imageAssets = [
    'https://static01.nyt.com/images/2015/09/20/magazine/20abduljabbar1/20mag-20abdul-jabbar-t_CA0-facebookJumbo.jpg',
    'https://static01.nyt.com/images/2019/06/05/business/00tesla1/00tesla1-facebookJumbo-v2.jpg',
    'https://static01.nyt.com/images/2020/01/31/arts/29jlo-notebook1/29jlo-notebook1-facebookJumbo.jpg',
    'https://static01.nyt.com/images/2017/07/01/upshot/up30-video-games/up30-video-games-facebookJumbo.jpg',
    'https://www.vectary.com/viewer/v1/?model=914e2a1a-abf1-4fd7-9cd6-87e5a9ba2142&env=studio3',
  ].map((url) => ({
    url,
    type: 'image/jpeg',
    height: 550,
    width: 1050,
  }));

  const videoAssets = [
    'https://infinite-digital-prod.s3.amazonaws.com/spencer/releases/July22drop1/public/rainbow_comp_v012.mp4',
    'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    'https://download.samplelib.com/mp4/sample-5s.mp4',
    'http://techslides.com/demos/sample-videos/small.mp4',
    'https://download.samplelib.com/mp4/sample-10s.mp4',
    'https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4',
  ].map((url) => ({
    url,
    key: url,
    type: 'video/mp4',
    height: 720,
    width: 720,
  }));
</script>

<Meta title="Lib / components / Gallery" component={Gallery} />

<Template let:args>
  <div class="max-w-5xl" style="height: min(500px, 100%);">
    <Gallery {...args} />
  </div>
</Template>

<Story name="Image" args={{ items: imageAssets }} />
<Story name="Video" args={{ items: videoAssets }} />
<Story name="No Items" args={{ items: [] }} />
