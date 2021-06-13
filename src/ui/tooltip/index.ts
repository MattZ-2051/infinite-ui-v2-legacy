import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './themes.css';

type UserInput = string | { [key: string]: unknown };

function setTippy(userInput: UserInput, instance) {
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

export default function tooltip(node: HTMLElement, userInput: UserInput) {
  const instance = tippy(node, {});
  setTippy(userInput, instance);
  return {
    update(newUserInput) {
      setTippy(newUserInput, instance);
    },
    destroy() {
      instance.destroy();
    },
  };
}
