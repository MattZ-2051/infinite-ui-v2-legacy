const redirects = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  externalUrlBase,
}: {
  externalUrlBase: string;
}): {
  route: string;
  status: 301 | 302;
  redirect: string;
}[] => [
  // Temporary redirect to disable /cookies and /about
  {
    route: '/cookies',
    status: 301,
    redirect: '/',
  },
  {
    route: '/about',
    status: 301,
    redirect: '/',
  },
];

export default redirects;
