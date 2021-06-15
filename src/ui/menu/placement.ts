import { createPopper } from '@popperjs/core';
import type { Options as PopperOptions, Placement } from '@popperjs/core';

export type { Placement } from '@popperjs/core';

export interface Options {
  referenceElement: HTMLElement;
  placement: Placement;
  offset?: {
    skidding?: number;
    distance?: number;
  };
  paddingOnOverflowFix?: number;
}

export function placement(targetElement: HTMLElement, options: Options) {
  const popperOptions = toPopperOptions(options);
  const popper = createPopper(options.referenceElement, targetElement, popperOptions);

  return {
    async update() {
      popper && (await popper.update());
    },

    async destroy() {
      popper && popper.destroy();
    },
  };
}

function toPopperOptions(options: Options): Partial<PopperOptions> {
  const { placement: _placement, offset, paddingOnOverflowFix } = options;

  const modifiers = [];

  if (offset) {
    modifiers.push({
      name: 'offset',
      options: {
        offset: [offset.skidding ?? 0, offset.distance ?? 0],
      },
    });
  }

  if (paddingOnOverflowFix) {
    modifiers.push({
      name: 'preventOverflow',
      options: {
        padding: paddingOnOverflowFix ?? 0,
      },
    });
  }

  return {
    placement: _placement,
    modifiers,
  };
}
