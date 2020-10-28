import { text } from 'svelte/internal';
import { writable } from 'svelte/store';

// a store in which all objects created on the canvas are saved

 const defaultValues = {
    lines: [],
    rectangles: [],
    text: [],
    progress: [],
    erasedSquares: [],
    numberOfObjects: 0,
    objectToMove: {}
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

  function saveProgressBarObject(newProgressBar) {
    update(objects => {
      return {
          ...objects,
          progress: [...objects.progress, newProgressBar],
          numberOfObjects: objects.numberOfObjects + 1
      };
    });
  }

  function markSquareToErase(erasedSquare) {
    update(objects => {
      return {
          ...objects,
          erasedSquares: [...objects.erasedSquares, erasedSquare],
          numberOfObjects: objects.numberOfObjects + 1
      };
    });
  }

  function createMovableObject(objectInfo) {
    update(objects => {
      return {
          ...objects,
         objectToMove: objectInfo
      };
    });
  }

  function deleteTextObject(index) {
    update(objects => {
      return {
          ...objects,
          text: objects.text.splice(index, 1)
      };
    });
  }


  return {
	  subscribe,
    set,
    saveLineObject,
    saveTextObject,
    saveRectangleObject,
    saveProgressBarObject,
    markSquareToErase,
    createMovableObject,
    deleteTextObject
	};

}

export const canvasObjects = setUpStore();