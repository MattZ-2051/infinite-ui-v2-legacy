/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

declare module '*format=avif;webp;png&metadata';
declare module '*format=avif;webp;jpeg&metadata';
