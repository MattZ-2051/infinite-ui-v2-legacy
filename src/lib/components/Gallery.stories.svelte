<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Gallery from './Gallery.svelte';

  const imageAssets = [
    {
      height: 550,
      type: 'image/jpg',
      url: 'https://static01.nyt.com/images/2015/09/20/magazine/20abduljabbar1/20mag-20abdul-jabbar-t_CA0-facebookJumbo.jpg',
      width: 1050,
    },
    {
      height: 550,
      type: 'image/jpg',
      url: 'https://static01.nyt.com/images/2019/06/05/business/00tesla1/00tesla1-facebookJumbo-v2.jpg',
      width: 1050,
    },
    {
      height: 550,
      type: 'image/jpg',
      url: 'https://static01.nyt.com/images/2020/01/31/arts/29jlo-notebook1/29jlo-notebook1-facebookJumbo.jpg',
      width: 1050,
    },
    {
      height: 550,
      type: 'image/jpg',
      url: 'https://static01.nyt.com/images/2017/07/01/upshot/up30-video-games/up30-video-games-facebookJumbo.jpg',
      width: 1050,
    },
  ];
</script>

<Meta title="Lib / components / Gallery" component={Gallery} />

<Template let:args>
  <div class="max-w-5xl">
    <Gallery {...args} />
  </div>
</Template>

<Story name="Image" args={{ items: imageAssets }} />
