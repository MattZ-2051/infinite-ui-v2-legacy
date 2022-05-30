import type { ImageMetadata } from '$ui/image/Image.svelte';
import image from './assets/image0.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image1 from './assets/image1.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image2 from './assets/image2.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image3 from './assets/image3.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image4 from './assets/image4.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image5 from './assets/image5.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image6 from './assets/image6.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image7 from './assets/image7.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image8 from './assets/image8.png?w=244&format=avif;webp;png&metadata=src;format;width;height';
import image9 from './assets/image9.png?w=244&format=avif;webp;png&metadata=src;format;width;height';

export type Person = {
  photo: ImageMetadata[];
  name: string;
  position: string;
};

export const management: Person[] = [
  {
    photo: image,
    name: 'Poonacha Machaiah',
    position: 'Co-founder & CEO',
  },
  {
    photo: image1,
    name: 'Matai Blacklock',
    position: 'Platform Dev. & Strategy',
  },
  {
    photo: image2,
    name: 'Nelson Diaz',
    position: 'NFT & Community Mgmt.',
  },
  {
    photo: image3,
    name: 'Gabriella Wright',
    position: 'Content & Storytelling',
  },
  {
    photo: image4,
    name: 'Whisbe',
    position: 'Artist Engagement',
  },
];

export const advisors: Person[] = [
  {
    photo: image5,
    name: 'Deepak Chopra, MD',
    position: 'Co-founder',
  },
  {
    photo: image6,
    name: 'Christian Hasker',
    position: 'Hedera, Chief Marketing Officer',
  },
  {
    photo: image7,
    name: 'Yonathan Lapchick',
    position: 'SUKU/InfiniteWorld, CEO',
  },
  {
    photo: image8,
    name: 'Nick Beucher',
    position: 'President, Tavistock Development Group',
  },
  {
    photo: image9,
    name: 'Parul Gujral',
    position: 'Snowball, Founder, CEO',
  },
];
