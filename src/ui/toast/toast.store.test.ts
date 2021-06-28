import { get } from 'svelte/store';
import toast from './toast.store';

describe('store', () => {
  afterEach(() => {
    toast.clear();
  });

  it('adds a toast', () => {
    toast.info('content');
    expect(get(toast)).toEqual([{ message: 'content', severity: 'info', toastId: 'toast-1' }]);
  });

  it('removes a toast', () => {
    toast.info('content', { toastId: '123' });
    expect(get(toast)).toHaveLength(1);

    toast.remove('123');
    expect(get(toast)).toHaveLength(0);
  });

  it('clears all toasts', () => {
    toast.info('content');
    toast.success('content');
    expect(get(toast)).toHaveLength(2);

    toast.clear();
    expect(get(toast)).toHaveLength(0);
  });
});
