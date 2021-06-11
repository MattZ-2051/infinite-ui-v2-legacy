import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './themes.css';

function setTippy(userInput, instance) {
  if (!userInput) {
    instance.disable();
    return;
  }

  const props = Object.assign({}, userInput, { content: userInput.content || userInput });
  instance.setProps(props);
  instance.enable();
}

export default function tooltip(node: HTMLElement, userInput: string | { [key: string]: unknown }) {
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
