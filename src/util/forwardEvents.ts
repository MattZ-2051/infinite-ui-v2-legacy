/* https://github.com/hperrin/svelte-material-ui/blob/master/packages/common/forwardEventsBuilder.js */

/* eslint-disable unicorn/consistent-function-scoping */
import { bubble, listen, prevent_default, stop_propagation } from 'svelte/internal';

// Match modifiers.
const modifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;

export function forwardEventsBuilder(component) {
  // This is our pseudo $on function. It is defined on component mount.
  let $on;
  // This is a list of events bound before mount.
  const events = [];
  // This is the original component $on function.
  const componentOn = component.$on;

  // And we override the $on function to forward all bound events.
  component.$on = (fullEventType, callback) => {
    const eventType = fullEventType;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let destructor = () => {};

    if ($on) {
      // The event was bound programmatically.
      destructor = $on(eventType, callback);
    } else {
      // The event was bound before mount by Svelte.
      events.push([eventType, callback]);
    }

    // Call the original $on function.
    // The modifiers are passed in so that if a lower component
    // forwards an event that doesn't bubble automatically, the
    // bound listeners will only be fired once.
    const componentDestructor = componentOn.call(component, eventType, callback);

    return (...arguments_) => {
      destructor();
      return componentDestructor(...arguments_);
    };
  };

  function forward(event) {
    // Internally bubble the event up from Svelte components.
    bubble(component, event);
  }

  return (node: EventTarget) => {
    const destructors = [];
    const forwardDestructors: { [key: string]: () => void } = {};

    // This function is responsible for listening and forwarding
    // all bound events.
    $on = (fullEventType, callback) => {
      let eventType: string = fullEventType;
      let handler = callback;
      // DOM addEventListener options argument.
      let options: { [key: string]: boolean };
      const modifierMatch = eventType.match(modifierRegex);
      if (modifierMatch) {
        // Parse the event modifiers.
        // Supported modifiers:
        // - preventDefault
        // - stopPropagation
        // - passive
        // - nonpassive
        // - capture
        // - once
        const parts = eventType.split('$');
        eventType = parts[0];
        options = Object.fromEntries(parts.slice(1).map((module) => [module, true]));
        if (options.nonpassive) {
          options.passive = false;
          delete options.nonpassive;
        }
        if (options.preventDefault) {
          handler = prevent_default(handler);
          delete options.preventDefault;
        }
        if (options.stopPropagation) {
          handler = stop_propagation(handler);
          delete options.stopPropagation;
        }
      }

      // Listen for the event directly, with the given options.
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const index = destructors.indexOf(destructor);
        if (index > -1) {
          destructors.splice(index, 1);
        }
      };

      destructors.push(destructor);

      // Forward the event from Svelte.
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }

      return destructor;
    };

    for (const event_ of events) {
      // Listen to all the events added before mount.
      $on(event_[0], event_[1]);
    }

    return {
      destroy: () => {
        // Remove all event listeners.
        for (const destructor of destructors) {
          destructor();
        }

        // Remove all event forwarders.
        for (const entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      },
    };
  };
}
