const watchlist: { [key: string]: NodeJS.Timeout } = {};

export type Poller = () => Promise<boolean>;

export type PollParameters = {
  id: string;
  poller: Poller;
  interval: number;
  onResolved?: () => void;
};

export async function poll({ id, poller, interval, onResolved }: PollParameters) {
  clearTimeout(watchlist[id]);
  delete watchlist[id];

  // The first time, try to poll immediately.
  if (await poller()) {
    onResolved();

    return;
  }

  const callback = await wrapPollable({ id, poller, interval, onResolved });

  watchlist[id] = setTimeout(callback, interval);
}

export function stopPolling(id: string) {
  clearTimeout(watchlist[id]);
  delete watchlist[id];
}

async function wrapPollable({ id, poller, interval, onResolved }: PollParameters) {
  return async () => {
    if (await poller()) {
      clearTimeout(watchlist[id]);
      delete watchlist[id];

      onResolved();

      return;
    }

    const callback = await wrapPollable({ id, poller, interval, onResolved });

    watchlist[id] = setTimeout(callback, interval);
  };
}
