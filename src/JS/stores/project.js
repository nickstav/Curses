import { writable } from 'svelte/store';

// a store to contain all variables related to the canvas element

 const defaultValues = {
    canvasHeight: 20,
    canvasWidth: 50,
    canvasElement: undefined,
    context: undefined,
    tool: undefined,
    textNewLine: 'indented',
    sizeOfProgressBar: 4,
    showProgressPercentage: true,
    startPosition: {x: 0, y: 0},
    isDrawing: false,
    isHighlighting: false,
    mousePosition: {x: 0, y: 0}
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  function removeCanvas() {
    set(defaultValues);
  }

  function createCanvas(canvasElement) {
    update(status => {
        return {
          ...status,
          canvasElement: canvasElement,
          context: canvasElement.getContext('2d')
        };
      });
  }

  function changeCanvasTool(buttonPressed) {
    update(status => {
      return {
        ...status,
        tool: buttonPressed
      };
    });
  }

  function getMouseCanvasPosition(event, canvasElement) {
    const x = event.clientX - canvasElement.offsetLeft;
    const y = event.clientY - canvasElement.offsetTop;

    return {x, y} 
}

  function updateStartPosition(event, canvasElement) {
    update(status => {
      return {
        ...status,
        startPosition: getMouseCanvasPosition(event, canvasElement)
      };
    });
  }

  function startDrawing() {
    update(status => {
      return {
          ...status,
          isDrawing: true
      };
    });
  }

  function stopDrawing() {
    update(status => {
      return {
          ...status,
          isDrawing: false
      };
    });
  }

  function turnOnSquareHighlighting() {
    update(status => {
      return {
          ...status,
          isHighlighting: true
      };
    });
  }

  function turnOffSquareHighlighting() {
    update(status => {
      return {
          ...status,
          isHighlighting: false
      };
    });
  }

  function updateMousePosition(event, canvasElement) {
    update(status => {
      return {
          ...status,
          mousePosition: getMouseCanvasPosition(event, canvasElement)
      };
    });
  }

  return {
	  subscribe,
    set,
    removeCanvas,
    createCanvas,
    changeCanvasTool,
    startDrawing,
    stopDrawing,
    turnOnSquareHighlighting,
    turnOffSquareHighlighting,
    updateStartPosition,
    updateMousePosition
	};

}

export const cursesCanvas = setUpStore();