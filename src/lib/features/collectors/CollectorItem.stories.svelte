<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import CollectorItem from './CollectorItem.svelte';

  let owner = {
    _id: 'string',
    createdAt: new Date(),
    externalId: 'string',
    hederaAccount: 'string',
    role: 'string',
    updatedAt: new Date(),
    username: 'Owner username',
    profilePhotoUrl: 'string',
    bannerPhotoUrl: 'string',
    midPhotoUrl: 'string',
    descriptionIcon: 'string',
    descriptionHeader: 'string',
    descriptionBody: 'string',
    footerPhotoUrl: 'string',
    tagline: 'string',
  };

  let collector = {
    _id: 'saad4hajbnv46',
    serialNumber: '5',
    createdAt: new Date(),
    owner: owner,
    sku: '',
  };

  function cc(options) {
    if (options.serialNumber) {
      collector.serialNumber = options.serialNumber;
    }
    if (options.profilePhoto) {
      owner.profilePhotoUrl = options.profilePhoto;
    }
    if (options.upcomingSale) {
      collector = { ...collector, upcomingProductListing: { startDate: options.upcomingSale } };
    }
    if (options.activeSale) {
      collector = { ...collector, activeProductListing: { saleType: 'fixed', price: options.activeSale } };
    }
    if (options.activeAuction) {
      collector = {
        ...collector,
        activeProductListing: {
          saleType: 'auction',
          minBid: options.activeAuction.minBid,
          endDate: options.activeAuction.endDate,
        },
      };
    }
    return { ...collector };
  }
</script>

<Meta title="Lib / features/ collectors/ CollectorItem" component={CollectorItem} argTypes={{}} />

<Template let:args>
  <div class="max-w-xl">
    <CollectorItem collector={cc(args)} redeemable={args.redeemable} currency="USD" />
  </div>
</Template>

<Story
  name="Has no profile photo"
  args={{
    profilePhoto: '',
    redeemable: false,
  }}
/>
<Story
  name="Upcoming sale"
  args={{
    serialNumber: '7',
    profilePhoto:
      'https://render.fineartamerica.com/images/rendered/default/poster/8/10/break/images/artworkimages/medium/1/bond-james-bond-sean-connery-thomas-pollart.jpg',
    upcomingSale: new Date('2021 09 18'),
    redeemable: true,
  }}
/>
<Story
  name="Not for sale"
  args={{
    profilePhoto:
      'https://www.looper.com/img/gallery/heres-where-you-can-watch-all-of-the-jumanji-movies/intro-1623157303.jpg',
    redeemable: false,
  }}
/>
<Story
  name="Active sale"
  args={{
    serialNumber: '2',
    activeSale: '2000',
    redeemable: true,
    profilePhoto: 'https://images.loaded.gr/img/path/5a15998d-40f3-428e-99aa-441d7d1a9c86_sean-connery_faam.jpg',
  }}
/>
<Story
  name="Active auction"
  args={{
    serialNumber: '4',
    redeemable: true,
    profilePhoto: 'https://i.pinimg.com/originals/39/8a/75/398a75ec8570c8368eaa79c9bca29501.jpg',
    activeAuction: { minBid: 300, endDate: new Date('2021 09 21') },
  }}
/>
