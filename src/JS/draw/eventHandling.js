import { get } from 'svelte/store';
import { projectStore } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';

import { tools } from '../constants/toolsList.js';
import { keyboardKeys } from '../constants/keyboardKeys.js';
import { selectStyle } from '../constants/selectTool.js';

import { updateCanvas } from './updateCanvas.js';
import { editObject } from './edit.js';
import { alignObjects } from './offset.js';
import { checkIfAreaBeingSelected, selectObject, selectAreaOnGrid, getMouseOffset } from './select.js';
import { handleKeyboardShortcuts } from './keyShortcuts.js';
import { duplicateObject } from './duplicate.js';
import { getGridLocation } from './location.js';


import { TextItem } from '../items/textItem.js';
import { LineItem } from '../items/lineItem.js';
import { RectangleItem } from '../items/rectangleItem.js';
import { ProgressBarItem } from '../items/progressBarItem.js';



function handleMouseClick(event) {
    let toolSelected = get(projectStore).tool;
    let selectMethod = get(projectStore).selectMethod;
    let canvasElement = get(projectStore).canvasElement;
    
    projectStore.updateMousePosition(event, canvasElement);
    let mouseLocation = get(projectStore).mousePosition;
    let gridLocation = getGridLocation(mouseLocation);

    switch(toolSelected) {
        case(tools.TEXT):
            let userText = prompt("Enter text/characters:");
            if (userText !== null) {
                canvasObjects.saveObjectToStore(new TextItem(userText, gridLocation));
            }
            break;
        case(tools.PROGRESS):
            canvasObjects.saveObjectToStore(new ProgressBarItem(gridLocation));
            break;
        case(tools.DRAG):
            if (selectMethod === selectStyle.OBJECTS) {
                selectObject(gridLocation, canvasElement, event);
            } else {
                // now mouse has been released, change select method to objects to allow for manipulation
                projectStore.changeSelectMethodToGrab();
            }
            canvasElement.style.cursor = "pointer";
            break; 
    } 

    //show updated canvas with any added/erased objects when clicking
    updateCanvas();
    console.log(gridLocation.x, gridLocation.y)
}

function handleMouseDown(event) {
    let toolSelected = get(projectStore).tool;
    let canvasElement = get(projectStore).canvasElement;

    // update the current position of the mouse & register button as held
    projectStore.updateMousePosition(event, canvasElement);
    let mouseLocation = get(projectStore).mousePosition;
    let gridLocation = getGridLocation(mouseLocation);
    projectStore.toggleMouseHeld();


    // update the start position of the cursor when the mouse is first pressed
    projectStore.updateStartPosition(event, canvasElement);

    // confirm that the canvas is being drawn on now the button is being held down
    projectStore.startDrawing();

    switch(toolSelected) {
        case(tools.DRAG):
            getMouseOffset(gridLocation);
            break;
    }
}

function handleMouseMove(event) {
    let isDrawing = get(projectStore).isDrawing;
    let toolSelected = get(projectStore).tool;
    let canvasElement = get(projectStore).canvasElement;
    let selectMethod = get(projectStore).selectMethod;

    let startPosition = get(projectStore).startPosition;
    let startGridLocation = getGridLocation(startPosition);

    projectStore.updateMousePosition(event, canvasElement);
    let mouseLocation = get(projectStore).mousePosition;
    let currentGridLocation = getGridLocation(mouseLocation);

    // define a variable to pass any live drawn shapes to updateCanvas() 
    let liveObject = null;

    switch(toolSelected) {
        case(tools.LINE):
            if (isDrawing) {
                liveObject = new LineItem(startGridLocation, currentGridLocation);
            }
            break;
        case(tools.RECTANGLE):
            if (isDrawing) {
                liveObject = new RectangleItem(startGridLocation, currentGridLocation);
            }
            break;
        case(tools.DRAG):
            // check if an area is being selected to highlight objects
            checkIfAreaBeingSelected(isDrawing);
            if (selectMethod === selectStyle.AREA) {
                if (isDrawing) {
                    canvasElement.style.cursor = "crosshair";
                    liveObject = selectAreaOnGrid(startGridLocation, currentGridLocation)
                }
            } else {
                editObject(isDrawing, currentGridLocation, canvasElement);
            }
            break;
    };

    //clear the canvas of any previous "live" drawn shapes and add all live/saved objects to the canvas
    updateCanvas(liveObject);
}

// if mouse button is released, canvas is no longer being drawn on
function handleMouseRelease() {
    let toolSelected = get(projectStore).tool;

    projectStore.stopDrawing();
    projectStore.toggleMouseHeld();

    let startPosition = get(projectStore).startPosition;
    let startGridLocation = getGridLocation(startPosition);
    let mouseLocation = get(projectStore).mousePosition;
    let currentGridLocation = getGridLocation(mouseLocation);

    switch(toolSelected) {
        case(tools.LINE):
            canvasObjects.saveObjectToStore(new LineItem(startGridLocation, currentGridLocation));
            break;
        case(tools.RECTANGLE):
            canvasObjects.saveObjectToStore(new RectangleItem(startGridLocation, currentGridLocation));
            break;
    }
    updateCanvas();
}

// turn off any drawing & ensure canvas remains up to date when the mouse leaves the canvas window
function handleMouseOut() {
    projectStore.stopDrawing();
    projectStore.turnOffSquareHighlighting();
    updateCanvas();
}

// turn on square highlighting for relevant tools
function handleMouseEnter() {
    let toolSelected = get(projectStore).tool;
    if (toolSelected === tools.TEXT || toolSelected === tools.PROGRESS || toolSelected === tools.KEYBOARD) {
        projectStore.turnOnSquareHighlighting();
    }

    let mouseButtonHeld = get(projectStore).mouseButtonHeld;
    if (mouseButtonHeld) {
        projectStore.startDrawing();
    }
}

function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === keyboardKeys.C) {
        duplicateObject();
    } else if ((event.ctrlKey || event.metaKey) && (
        event.key === keyboardKeys.LEFT || 
        event.key === keyboardKeys.UP || 
        event.key === keyboardKeys.RIGHT || 
        event.key === keyboardKeys.DOWN)
        ) {
            alignObjects(event.key);
    } else {
        handleKeyboardShortcuts(event.key);
    }
    updateCanvas();
}

export { 
    handleMouseClick, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseRelease, 
    handleMouseOut,
    handleMouseEnter,
    handleKeyDown
}