export const KNOWN_EXTENSIONS = {
  avif: { type: 'image/avif' },
  webp: { type: 'image/webp' },
  jpeg: { type: 'image/jpeg' },
  jpg: { type: 'image/jpg' },
  png: { type: 'image/png' },
};

export type EXT = keyof typeof KNOWN_EXTENSIONS;
