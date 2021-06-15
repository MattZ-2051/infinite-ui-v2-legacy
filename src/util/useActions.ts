export default function useActions(node: HTMLElement | SVGSVGElement, actions) {
  const objects = [];

  if (actions) {
    for (const action_ of actions) {
      const isArray = Array.isArray(action_);
      const action = isArray ? action_[0] : action_;
      if (isArray && action_.length > 1) {
        objects.push(action(node, action_[1]));
      } else {
        objects.push(action(node));
      }
    }
  }

  return {
    update(newActions) {
      if (newActions && newActions.length !== actions.length) {
        throw new Error('You must not change the length of an actions array.');
      }

      if (newActions) {
        for (const [index, newAction] of newActions.entries()) {
          if (objects[index] && 'update' in objects[index]) {
            const isArray = Array.isArray(newAction);
            if (isArray && newAction.length > 1) {
              objects[index].update(newAction[1]);
            } else {
              objects[index].update();
            }
          }
        }
      }
    },

    destroy() {
      for (const object of objects) {
        if (object && 'destroy' in object) {
          object.destroy();
        }
      }
    },
  };
}
