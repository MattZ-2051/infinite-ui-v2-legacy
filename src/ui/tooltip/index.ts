import type { Instance, Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './themes.css';

export type TooltipInput = string | { [key: string]: unknown };

function setTippy(userInput: TooltipInput, instance: Instance<Props>) {
  if (!userInput) {
    instance.disable();
    return;
  }

  if (typeof userInput === 'string') {
    userInput = { content: userInput };
  }

  instance.setProps({ appendTo: (element) => element.closest('[data-theme-context]'), ...userInput });
  instance.enable();
}

export default function tooltip(node: HTMLElement | SVGSVGElement, userInput: TooltipInput): SvelteActionReturn {
  (async () => {
    const { default: tippy } = await import('tippy.js');

    const instance = tippy(node, {});

    setTippy(userInput, instance);
    return {
      update(newUserInput: TooltipInput) {
        setTippy(newUserInput, instance);
      },
      destroy() {
        instance.destroy();
      },
    };
  })();
}
