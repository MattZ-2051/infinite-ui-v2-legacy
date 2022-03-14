// eslint-disable-next-line no-restricted-imports
import routes from '$lib/routes';

export default {
  ...routes,
  index: process.env.NODE_ENV === 'production' ? 'https://www.ariaexchange.com' : 'https://uat.ariaexchange.com',
  help: 'https://aria-network.force.com/support/s/',
  careers: 'https://jobs.wrkhq.com/the-aria-network',
};
