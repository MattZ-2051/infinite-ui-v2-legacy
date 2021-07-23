import { createEvent, forward } from 'effector';
import { achAccountFetchFx } from '../withdraw.store';

export const achAccountAdded = createEvent<void>();

forward({
  from: achAccountAdded,
  to: achAccountFetchFx,
});
