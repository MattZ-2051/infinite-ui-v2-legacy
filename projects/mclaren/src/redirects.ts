const redirects = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  externalUrlBase,
}: {
  externalUrlBase: string;
}): {
  route: string;
  status: 301 | 302 | 404;
  redirect?: string;
}[] => [
  {
    route: '/about',
    status: 404,
  },
  {
    route: '/collections',
    status: 301,
    redirect: `/collections/${import.meta.env.VITE_DEFAULT_COLLECTION_ID}`, //temporarily only one collection
  },
];

export default redirects;
