import { poll } from './poll.service';

const maxCounter = 5;
const interval = 50;

describe('pollEveryGivenMilliseconds', () => {
  let counter = 0;
  let _resolve;
  const toResolve = new Promise((resolve) => (_resolve = resolve));
  const start = Date.now();
  let end;

  beforeAll(() =>
    poll({
      id: '123',
      poller: () => {
        counter += 1;

        return Promise.resolve(counter === maxCounter);
      },
      interval,
      onResolved: () => {
        end = Date.now();

        _resolve(counter);
      },
    })
  );

  it('should resolve after 4 times the interval', async () => {
    await expect(toResolve).resolves.toBe(5);

    // The total time is near `(maxCounter - 1) * interval`.
    // This happens because, even if we poll maxCounter times,
    // the first time, we poll immediately.
    const totalTime = end - start;
    const expectedTime = (maxCounter - 1) * interval;
    expect(totalTime).toBeGreaterThanOrEqual(expectedTime);
  });
});
