const redirects = ({
  externalUrlBase,
}: {
  externalUrlBase: string;
}): {
  route: string;
  status: 301 | 302;
  redirect: string;
}[] => [
  {
    route: '/collection/ARIAExchange',
    status: 301,
    redirect: externalUrlBase,
  },
  {
    route: '/collection/ariaexchange',
    status: 301,
    redirect: externalUrlBase,
  },
];

export default redirects;
