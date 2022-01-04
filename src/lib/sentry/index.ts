import type { User } from '$lib/user/types';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import { SENTRY_DNS } from '$project/variables';

export default (environment: string, userData: User, project: string): void => {
  Sentry.init({
    dsn: SENTRY_DNS,
    integrations: [new Integrations.BrowserTracing()],
    // eslint-disable-next-line unicorn/no-zero-fractions
    tracesSampleRate: 1.0,
    environment,
  });

  if (userData) {
    const { email, _id, username } = userData;
    Sentry.setUser({ email, id: _id, username });
  }

  Sentry.setContext('project', {
    name: project,
  });

  Sentry.setTag('project', project);
};
