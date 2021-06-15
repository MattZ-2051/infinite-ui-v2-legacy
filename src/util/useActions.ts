type UseActionWithParameters = [action: SvelteAction, parameters: unknown];
type UseAction = UseActionWithParameters | SvelteAction;

function create(action: SvelteAction, node: HTMLElement | SVGSVGElement, parameters: unknown) {
  return parameters ? action(node, parameters) : action(node);
}

function update(object: SvelteActionReturn, parameters: unknown) {
  if (object && 'update' in object) {
    parameters ? object.update(parameters) : object.update();
  }
}

function destroy(object: SvelteActionReturn) {
  if (object && 'destroy' in object) {
    object.destroy();
  }
}

export default function useActions(node: HTMLElement | SVGSVGElement, actions: UseAction[]) {
  const objects: SvelteActionReturn[] = [];

  for (const action_ of actions) {
    const [action, parameters] = Array.isArray(action_) ? action_ : [action_];
    if (action) {
      objects.push(create(action, node, parameters));
    } else {
      objects.push();
    }
  }

  return {
    update(newActions: UseAction[]) {
      for (const [index, action_] of newActions.entries()) {
        const [action, parameters] = Array.isArray(action_) ? action_ : [action_];
        const existing = objects[index];
        if (action) {
          if (existing) {
            update(existing, parameters);
          } else {
            objects[index] = create(action, node, parameters);
          }
        } else if (existing) {
          destroy(existing);
          objects[index] = undefined;
        }
      }
    },

    destroy() {
      for (const object of Object.values(objects)) {
        destroy(object);
      }
      // Clean up
      objects.splice(0, objects.length);
    },
  };
}
