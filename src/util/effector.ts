import type { Effect } from 'effector';
import { createEffect, createStore, createEvent, forward, guard } from 'effector';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createPolling(fx: Effect<void, any, Error>, delay = 1000) {
  const start = createEvent();
  const stop = createEvent();
  const $isActive = createStore(false)
    .on(start, () => true)
    .on(stop, () => false);

  const delayFx = createEffect(() => new Promise((resolve) => setTimeout(resolve, delay)));

  forward({
    from: start,
    to: fx,
  });

  forward({
    from: fx.done,
    to: delayFx,
  });

  guard({
    clock: delayFx.done,
    filter: $isActive,
    target: fx,
  });

  return { start, stop, $isActive };
}
