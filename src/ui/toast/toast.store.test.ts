import { get } from 'svelte/store';
import toast from './toast.store';

describe('store', () => {
  afterEach(() => {
    toast.clear();
  });

  it('adds a toast', () => {
    toast.info('content');
    expect(get(toast)).toHaveLength(1);
    expect(get(toast)[0]).toMatchObject({ message: 'content', severity: 'info' });
  });

  it('removes a toast', () => {
    toast.info('content', { toastId: '123' });
    expect(get(toast)).toHaveLength(1);

    toast.remove('123');
    expect(get(toast)).toHaveLength(0);
  });

  it('replaces a toast if toastId already exists', () => {
    toast.info('content', { toastId: '123' });
    toast.success('content');
    toast.warning('new content', { toastId: '123' });
    expect(get(toast)).toHaveLength(2);
    expect(get(toast)[1]).toMatchObject({ message: 'new content', severity: 'warning' });
  });

  it('clears all toasts', () => {
    toast.info('content');
    toast.success('content');
    expect(get(toast)).toHaveLength(2);

    toast.clear();
    expect(get(toast)).toHaveLength(0);
  });
});
