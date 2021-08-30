import { addItemToSelection, isItemActive } from './utils';

describe('isItemActive', () => {
  const selection = ['item-1', 'item-2'];

  it('should detect active item properly', () => {
    // multiple
    expect(isItemActive('item-1', true, selection)).toBe(true);
    expect(isItemActive('item-3', true, selection)).toBe(false);
    expect(isItemActive('item-1', true, 'item-1')).toBe(true);
    expect(isItemActive('item-1', true, undefined)).toBe(false);

    // single
    expect(isItemActive('item-1', false, selection)).toBe(false);
    expect(isItemActive('item-3', false, selection)).toBe(false);
    expect(isItemActive('item-1', false, 'item-1')).toBe(true);
    expect(isItemActive('item-1', false, undefined)).toBe(false);
  });
});

describe('addItemToSelection', () => {
  const selection = ['item-1', 'item-2'];

  it('should add item to selection properly', () => {
    // multiple
    expect(addItemToSelection('item-1', true, selection)).toEqual(['item-2']);
    expect(addItemToSelection('item-3', true, selection)).toEqual(['item-1', 'item-2', 'item-3']);
    expect(addItemToSelection('item-1', true, 'item-1')).toEqual([]);
    expect(addItemToSelection('item-1', true, 'item-2')).toEqual(['item-2', 'item-1']);
    expect(addItemToSelection('item-1', true, undefined)).toEqual(['item-1']);

    // single
    expect(addItemToSelection('item-1', false, selection)).toBe('item-1');
    expect(addItemToSelection('item-3', false, selection)).toBe('item-3');
    expect(addItemToSelection('item-1', false, 'item-1')).toBeUndefined();
    expect(addItemToSelection('item-1', false, 'item-2')).toBe('item-1');
    expect(addItemToSelection('item-1', false, undefined)).toBe('item-1');
  });
});
