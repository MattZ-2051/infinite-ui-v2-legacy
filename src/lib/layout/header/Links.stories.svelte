<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Links from './Links.svelte';

  let user = {
    profilePhotoUrl: '',
    username: 'Sean Connery',
    _id: 'string',
    email: 'string',
    roles: [],
    permissions: [],
    balance: 222,
    availableBalance: 222,
    createdAt: new Date(),
    externalId: 'string',
    hederaAccount: 'string',
    role: 'string',
    updatedAt: new Date(),
    bannerPhotoUrl: 'string',
    midPhotoUrl: 'string',
    descriptionIcon: 'string',
    descriptionHeader: 'string',
    descriptionBody: 'string',
    footerPhotoUrl: 'string',
    tagline: 'string',
  };

  function uc(options) {
    if (options.noUser) {
      return undefined;
    }

    return { ...user, ...options };
  }
</script>

<Meta title="UI / lib / Layout / Links" component={Links} />

<Template let:args>
  <div class="flex items-center gap-2">
    <Links user={uc(args)} />
  </div>
</Template>

<Story name="Default" />
<Story
  name="With rofile photo"
  args={{
    profilePhotoUrl: 'https://13thdimension.com/wp-content/uploads/2020/10/yrlKxWD4bOL04MzL27Qs-580x435.jpg',
  }}
/>
<Story name="No user" args={{ noUser: true }} />
