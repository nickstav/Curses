import { writable } from 'svelte/store';
import { selectStyle } from '../constants/selectTool.js';

// a store to contain all variables related to the canvas element

 const defaultValues = {
    showSplash: true,
    canvasHeight: 22,
    canvasWidth: 80,
    canvasElement: undefined,
    context: undefined,
    tool: undefined,
    textNewLine: 'indented',
    selectMethod: selectStyle.OBJECTS,
    selectedAreaCoords: [],
    IDOfFirstSelectedObject: undefined,
    sizeOfProgressBar: 4,
    showProgressPercentage: true,
    startPosition: {x: 0, y: 0},
    isDrawing: false,
    isHighlighting: false,
    mousePosition: {x: 0, y: 0},
    pythonScript: '',
    showPythonScript: false,
    showSidebar: false,
    showShortcuts: false
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

  function hideSplash() {
    update(status => {
      return {
        ...status,
        showSplash: false
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

  function saveSelectedAreaCoords(startCoords, endCoords) {
    update(status => {
      return {
          ...status,
          selectedAreaCoords: [startCoords, endCoords]
      };
    });
  }

  function changeSelectMethodToGrab() {
    update(status => {
      return {
          ...status,
          selectMethod: selectStyle.OBJECTS
      };
    });
  }

  function changeSelectMethodToArea() {
    update(status => {
      return {
          ...status,
          selectMethod: selectStyle.AREA
      };
    });
  }

  function markObjectAsFirstSelected(ID) {
    update(status => {
      return {
          ...status,
          IDOfFirstSelectedObject: ID
      };
    });
  }

  function removeFirstSelectedObject() {
    update(status => {
      return {
          ...status,
          IDOfFirstSelectedObject: undefined
      };
    });
  }

  function updatePythonScript(string) {
    update(status => {
      return {
          ...status,
          pythonScript: string
      };
    });
  }

  function toggleShowPythonScript() {
    update(status => {
      return {
          ...status,
          showPythonScript: !status.showPythonScript
      };
    });
  }
  
function toggleShortcutMenu() {
  update(status => {
    return {
        ...status,
        showShortcuts: !status.showShortcuts
    };
  });
}

function toggleSidebar() {
  update(status => {
    return {
        ...status,
        showSidebar: !status.showSidebar
    };
  });
}

  return {
	  subscribe,
    set,
    removeCanvas,
    createCanvas,
    hideSplash,
    changeCanvasTool,
    startDrawing,
    stopDrawing,
    turnOnSquareHighlighting,
    turnOffSquareHighlighting,
    updateStartPosition,
    updateMousePosition,
    saveSelectedAreaCoords,
    changeSelectMethodToGrab,
    changeSelectMethodToArea,
    markObjectAsFirstSelected,
    removeFirstSelectedObject,
    updatePythonScript,
    toggleShowPythonScript,
    toggleSidebar,
    toggleShortcutMenu
	};

}

export const cursesCanvas = setUpStore();