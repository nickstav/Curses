import { writable } from 'svelte/store';

// a store in which all objects created on the canvas are saved

 const defaultValues = {
    lines: [],
    rectangles: [],
    text: [],
    progress: [],
    erasedSquares: [],
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

  function updateObjectLocation(objectNumber, newLocation) {
    update(objects => {

      let updatedText = objects.text;
      for (let i = 0; i < updatedText.length; i++) {
        if (updatedText[i].order === objectNumber) {
          updatedText[i].location = newLocation;
        }
      }
      
      return {
        ...objects,
        text: updatedText
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
    updateObjectLocation
	};

}

export const canvasObjects = setUpStore();