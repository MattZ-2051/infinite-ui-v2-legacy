import { mdiTwitter, mdiInstagram } from '@mdi/js';
import { MP_INSTAGRAM_LINK, MP_TWITTER_LINK } from '$project/variables';

export const links = [
  { id: 'Instagram', href: MP_INSTAGRAM_LINK, path: mdiInstagram },
  { id: 'Twitter', href: MP_TWITTER_LINK, path: mdiTwitter },
];
