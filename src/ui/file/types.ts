export type FileAsset = {
  bucket: string;
  hash: string;
  height: number;
  key: string;
  previewUrl?: string;
  size: number;
  type: string;
  url: string;
  width: number;
};

export type FileType = 'video' | 'image' | 'audio' | 'vector' | undefined;
