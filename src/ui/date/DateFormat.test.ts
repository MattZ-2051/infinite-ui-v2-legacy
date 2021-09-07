import { render } from '@testing-library/svelte';
import DateFormat from './DateFormat.svelte';

describe('DateFormat', () => {
  let component;
  let container: HTMLElement;

  beforeEach(() => {
    ({ component, container } = render(DateFormat, {
      props: { value: new Date(2010, 8, 30, 15, 0, 10) },
    }));
  });
  it('renders correctly', async () => {
    expect(container).toHaveTextContent('Sep 30, 2010, 3:00 PM');
  });

  it('updates correctly', async () => {
    await component.$set({ value: new Date(2013, 7, 11, 10, 30, 10) });
    expect(container).toHaveTextContent('Aug 11, 2013, 10:30 AM');
  });

  it('handles ISO string', async () => {
    await component.$set({ value: '2014-10-23T09:00:00.000Z' });
    expect(container).toHaveTextContent('Oct 23, 2014, 9:00 AM');
  });
});
