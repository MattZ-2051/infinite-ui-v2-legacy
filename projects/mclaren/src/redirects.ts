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
];

export default redirects;
