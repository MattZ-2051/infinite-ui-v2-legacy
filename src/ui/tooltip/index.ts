import type { Instance, Props } from 'tippy.js';
import tippy from 'tippy.js';
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

  const properties = Object.assign({}, userInput);
  instance.setProps(properties);
  instance.enable();
}

export default function tooltip(node: HTMLElement, userInput: TooltipInput) {
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
}
