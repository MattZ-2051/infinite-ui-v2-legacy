import type { NotifyInfo } from './types';
import { patch } from '$lib/api';

export async function notifyItem(data: NotifyInfo) {
  return await patch(``, data);
}
