export const addItemToSelection = (
  value: string,
  multiple: boolean,
  selection?: string | string[]
): string | string[] | undefined => {
  let next: string | string[] | undefined;
  if (multiple) {
    if (!selection) {
      selection = [];
    } else if (!Array.isArray(selection)) {
      selection = [selection];
    }
    // Remove if already there or add to selection
    const index = selection.indexOf(value);
    next = index !== -1 ? [...selection.slice(0, index), ...selection.slice(index + 1)] : [...selection, value];
  } else {
    next = selection === value ? undefined : value;
  }

  return next;
};

export const isItemActive = (value: string, multiple: boolean, selection?: string | string[]): boolean => {
  // Multiple
  if (multiple) {
    if (!selection) {
      return false;
    } else if (!Array.isArray(selection)) {
      selection = [selection];
    }

    return selection.includes(value);
  }

  // Single
  return value === selection;
};
