/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

declare module '*format=avif;webp;png&metadata';
declare module '*format=avif;webp;jpeg&metadata';

type SvelteAction = (node: HTMLElement | SVGSVGElement, parameters?: unknown) => SvelteActionReturn;

type SvelteActionReturn = {
  update?: (updateParameters?: unknown) => void;
  destroy?: () => void;
} | void;
