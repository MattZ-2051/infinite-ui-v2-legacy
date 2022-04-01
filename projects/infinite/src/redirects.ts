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
  // Temporary redirect to disable /cookies and /about
  {
    route: '/cookies',
    status: 404,
  },
  {
    route: '/about',
    status: 404,
  },
];

export default redirects;
