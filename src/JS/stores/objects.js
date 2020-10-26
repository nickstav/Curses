import { writable } from 'svelte/store';

// a store in which all objects created on the canvas are saved

 const defaultValues = {
    lines: [],
    rectangles: [],
    text: [],
    progress: [],
    numberOfObjects: 0
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  function saveLineObject(newLine) {
    update(objects => {
      return {
          ...objects,
          lines: [...objects.lines, newLine],
          numberOfObjects: objects.numberOfObjects + 1
      };
    });
  }

  function saveTextObject(newText) {
    update(objects => {
      return {
          ...objects,
          text: [...objects.text, newText],
          numberOfObjects: objects.numberOfObjects + 1
      };
    });
  }

  function saveRectangleObject(newRectangle) {
    update(objects => {
      return {
          ...objects,
          rectangles: [...objects.rectangles, newRectangle],
          numberOfObjects: objects.numberOfObjects + 1
      };
    });
  }

  return {
	  subscribe,
    set,
    saveLineObject,
    saveTextObject,
    saveRectangleObject
	};

}

export const canvasObjects = setUpStore();