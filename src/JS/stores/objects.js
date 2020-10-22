import { writable } from 'svelte/store';

// a store in which all objects created on the canvas are saved

 const defaultValues = {
    lines: [],
    rectangles: [],
    text: [],
    progress: []
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  function saveTextObject(newText) {
    update(objects => {
      return {
          ...objects,
          text: [...objects.text, newText]
      };
    });
  }

  function saveRectangleObject(newRectangle) {
    update(objects => {
      return {
          ...objects,
          rectangles: [...objects.rectangles, newRectangle]
      };
    });
  }

  return {
	  subscribe,
    set,
    saveTextObject,
    saveRectangleObject
	};

}

export const canvasObjects = setUpStore();