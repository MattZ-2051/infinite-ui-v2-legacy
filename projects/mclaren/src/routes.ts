// eslint-disable-next-line no-restricted-imports
import routes from '$lib/routes';

const routesWithPhase = () => {
  const phase = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('phase') : '';
  if (!phase) return routes;

  const routesEntries = Object.entries(routes);
  const routesEntriesWithPhase = routesEntries.map(([routeName, path]) => {
    if (typeof path === 'string') return [routeName, `${path}?phase=${phase}`];

    const functionPath = (argument1: string, argument2?: string) => {
      const dynamicPath = path(argument1, argument2);
      return `${dynamicPath}${dynamicPath.includes('?') ? '&' : '?'}phase=${phase}`;
    };
    return [routeName, functionPath];
  }) as Iterable<readonly [unknown, unknown]>;

  const remappedRoutesEntries = new Map(routesEntriesWithPhase);
  return Object.fromEntries(remappedRoutesEntries);
};

export default {
  ...routesWithPhase(),
  faq: 'https://cars.mclaren.com/gb-en/nft-faqs',
  discord: 'https://discord.com/invite/mclaren',
  opensea: 'https://opensea.io/collection/mclarenmsolabgenesis',
  suku: 'https://www.suku.world',
  careers: 'https://mclarencareers.mclaren.com/?_ga=2.243386309.1509309442.1648474878-868223602.1644268772',
  partners: 'https://cars.mclaren.com/us-en/about/partners',
  media:
    'https://www.cars.mclaren.press/?adobe_mc=MCMID%3D23104992409266755802342714820192224143%7CMCORGID%3D240D562C5C77E9C70A495EB6%2540AdobeOrg%7CTS%3D1648486095',
  mcLarenGroup: 'https://www.mclaren.com/group/?_ga=2.246591300.1509309442.1648474878-868223602.1644268772',
  mcLarenRacing: 'https://www.mclaren.com/racing/?_ga=2.12111476.1509309442.1648474878-868223602.1644268772',
  mcLarenApplied: 'https://www.mclaren.com/applied/?_ga=2.45263844.1509309442.1648474878-868223602.1644268772',
  investors: 'https://investors.mclaren.com/?_ga=2.45263844.1509309442.1648474878-868223602.1644268772',
  cookiePolicyExt: 'https://cars.mclaren.com/us-en/cookie-policy',
  privacyPoliyExt: 'https://cars.mclaren.com/us-en/privacy-policy',
  genderGapReport:
    'https://cars.mclaren.com/content/dam/mclaren-automotive/pdf/MCL_20753%20Gender%20Pay%20Gap%20Report%202020.pdf',
  termsAndConditions: 'https://cars.mclaren.com/us-en/terms-and-conditions',
  antiSlaveryStatement:
    'https://cars.mclaren.com/content/dam/mclaren-automotive/pdf/McLaren_Modern%20Slavery%20and%20Human%20Trafficking%20Statement_Year%20Ending%202020.pdf',
  contactUs: 'https://cars.mclaren.com/us-en/contact-us',
  enquire: 'https://cars.mclaren.com/us-en/enquire?campaignid=CMP-01086-M1P5R4',
  findRetailer: 'https://retailers.mclaren.com/en?_ga=2.208793554.1509309442.1648474878-868223602.1644268772',
  facebook: 'https://www.facebook.com/mclarenautomotive/',
  twitter: 'https://twitter.com/mclarenauto',
  instagram: 'https://www.instagram.com/mclarenauto/',
  youtube: 'https://www.youtube.com/channel/UCiWQ5eQPkw2BX2L4jeHKEVQ',
};
