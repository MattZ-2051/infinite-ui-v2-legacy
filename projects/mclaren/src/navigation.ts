import { afterNavigate } from '$app/navigation';

export function onAfterNavigate(): void {
  afterNavigate(({ from, to }) => {
    // eslint-disable-next-line no-console
    console.log({ from, to });
  });
}
