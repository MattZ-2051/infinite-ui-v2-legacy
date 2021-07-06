import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { render } from '@testing-library/svelte';
import TimeDifference from './TimeDifference.svelte';
import { time } from './clock';

jest.mock('./clock', () => ({ time: writable(+new Date(2021, 6, 6, 14)) }));

describe('TimeDifference', () => {
  it('renders correctly', async () => {
    const { container } = render(TimeDifference, {
      props: { date: new Date(2021, 6, 11, 14) },
    });

    expect(container).toHaveTextContent('5d 0h 00m');
  });

  it('should show seconds if less than one day', async () => {
    const { container } = render(TimeDifference, {
      props: { date: new Date(2021, 6, 6, 15, 20, 20) },
    });

    expect(container).toHaveTextContent('1h 20m 20s');
  });

  it('should not show seconds if more than a day', async () => {
    const { container } = render(TimeDifference, {
      props: { date: new Date(2021, 6, 7, 15, 20, 20) },
    });

    expect(container).toHaveTextContent('1d 1h 20m');
  });

  it('should parse string input correctly', async () => {
    const { container } = render(TimeDifference, {
      props: { date: '2021-07-08T15:05:50.000Z' },
    });

    expect(container).toHaveTextContent('2d 1h 05m');
  });

  it('should update when props change', async () => {
    const { container, component } = render(TimeDifference, {
      props: { date: new Date(2021, 6, 7, 15, 20, 20) },
    });
    expect(container).toHaveTextContent('1d 1h 20m');

    await component.$set({ date: new Date(2021, 6, 7, 16, 20, 20) });
    expect(container).toHaveTextContent('1d 2h 20m');
  });

  it('should update when clock changes', async () => {
    const { container } = render(TimeDifference, {
      props: { date: new Date(2021, 6, 7, 15, 20, 20) },
    });

    expect(container).toHaveTextContent('1d 1h 20m');

    await (time as Writable<Date>).set(new Date(2021, 6, 6, 14, 1));
    expect(container).toHaveTextContent('1d 1h 19m');

    await (time as Writable<Date>).set(new Date(2021, 6, 7, 14, 1, 30));
    expect(container).toHaveTextContent('1h 18m 50s');

    await (time as Writable<Date>).set(new Date(2021, 6, 7, 14, 1, 31));
    expect(container).toHaveTextContent('1h 18m 49s');
  });
});
