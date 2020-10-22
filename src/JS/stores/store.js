import { writable } from 'svelte/store';

 const defaultValues = {
    canvasHeight: 20,
    canvasWidth: 50,
    minDimensions: {width: 5, height: 5},
    maxDimensions: {width: 100, height: 100},
    gridDimension: {x: 11, y: 24},
    canvasElement: undefined,
    context: undefined,
    tool: undefined,
    startPosition: {x: 0, y: 0},
    isDrawing: false,
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
    updateStartPosition,
    updateMousePosition
	};

}

export const cursesCanvas = setUpStore();