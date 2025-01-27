export type MenuItems = {
  registerItem(id: string, element: HTMLElement): void;
  unregisterItem(id: string): void;
};

export type VisibleStore = {
  visible: boolean;
  event?: Event | { from: URL; to: URL };
  reason?: 'select' | 'click' | 'clickoutside' | 'keydown' | 'navigation';
};
