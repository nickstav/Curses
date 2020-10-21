import { writable } from 'svelte/store';

 const defaultValues = {
    lines = {},
    rectangles = [],
    text = {},
    progress = {}
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  function saveLine(newLine) {
    update(objects => {
      return {
          ...objects,
          lines: objects.lines.push(newLine)
      };
    });
  }

  return {
	subscribe,
    set,
    saveLine
	};

}

export const canvasOjects = setUpStore();