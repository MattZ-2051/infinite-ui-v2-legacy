const ariaExternal =
  process.env.SVELTEKIT_MODE === 'production' ? 'https://www.ariaexchange.com' : 'https://uat.ariaexchange.com';

const redirects: {
  route: string;
  status: 301 | 302;
  redirect: string;
}[] = [
  {
    route: '/collection/ARIAExchange',
    status: 301,
    redirect: ariaExternal,
  },
  {
    route: '/collection/ariaexchange',
    status: 301,
    redirect: ariaExternal,
  },
];

export default redirects;
