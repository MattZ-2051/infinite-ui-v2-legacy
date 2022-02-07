<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import CollectionUser from './CollectionUser.svelte';

  const profile = {
    username: 'MichaelScott',
    profilePhotoUrl: 'https://image.flaticon.com/icons/png/512/147/147144.png',
    tagline: 'YouTuber, Geek , Consumer Electronics and Tech Head',
  };
</script>

<Meta title="Lib / features / collection / User" component={CollectionUser} />

<Template let:args>
  <div class="max-w-m">
    <CollectionUser {...args} />
  </div>
</Template>

<Story name="Default" args={{ profile }} />
<Story name="Own" args={{ profile, own: true }} />
