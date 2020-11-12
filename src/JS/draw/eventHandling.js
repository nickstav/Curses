import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';
import { canvasObjects } from '../stores/objects.js';

import { tools } from '../constants/toolsList.js';
import { updateCanvas } from './updateCanvas.js';
import { editObject } from './edit.js';
import { selectObject, getMouseOffset } from './select.js';
import { handleKeyboardShortcuts } from './keyShortcuts.js';
import { duplicateObject } from './duplicate.js';
import { getGridLocation } from './location.js';


import { TextItem } from '../items/textItem.js';
import { LineItem } from '../items/lineItem.js';
import { RectangleItem } from '../items/rectangleItem.js';
import { ProgressBarItem } from '../items/progressBarItem.js';
import { keyboardKeys } from '../constants/keyboardKeys.js';



function handleMouseClick(event) {
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;
    
    cursesCanvas.updateMousePosition(event, canvasElement);
    let mouseLocation = get(cursesCanvas).mousePosition;
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
            selectObject(gridLocation, canvasElement); 
            break;  
    } 

    //show updated canvas with any added/erased objects when clicking
    updateCanvas();
}

function handleMouseDown(event) {
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;

    // update the current position of the mouse
    cursesCanvas.updateMousePosition(event, canvasElement);
    let mouseLocation = get(cursesCanvas).mousePosition;
    let gridLocation = getGridLocation(mouseLocation);

    // update the start position of the cursor when the mouse is first pressed
    cursesCanvas.updateStartPosition(event, canvasElement);

    // confirm that the canvas is being drawn on now the button is being held down
    cursesCanvas.startDrawing();

    switch(toolSelected) {
        case(tools.DRAG):
            getMouseOffset(gridLocation);
            break;
    }
}

function handleMouseMove(event) {
    let isDrawing = get(cursesCanvas).isDrawing;
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;

    let startPosition = get(cursesCanvas).startPosition;
    let startGridLocation = getGridLocation(startPosition);

    cursesCanvas.updateMousePosition(event, canvasElement);
    let mouseLocation = get(cursesCanvas).mousePosition;
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
            editObject(isDrawing, currentGridLocation, canvasElement);
            break;
    };

    //clear the canvas of any previous "live" drawn shapes and add all live/saved objects to the canvas
    updateCanvas(liveObject);
}

// if mouse button is released, canvas is no longer being drawn on
function handleMouseRelease() {
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;

    cursesCanvas.stopDrawing();

    let startPosition = get(cursesCanvas).startPosition;
    let startGridLocation = getGridLocation(startPosition);
    let mouseLocation = get(cursesCanvas).mousePosition;
    let currentGridLocation = getGridLocation(mouseLocation);

    switch(toolSelected) {
        case(tools.LINE):
            canvasObjects.saveObjectToStore(new LineItem(startGridLocation, currentGridLocation));
            break;
        case(tools.RECTANGLE):
            canvasObjects.saveObjectToStore(new RectangleItem(startGridLocation, currentGridLocation));
            break;
        case(tools.DRAG):
            canvasElement.style.cursor = "pointer";
            break;
    }
}

// turn off any drawing & ensure canvas remains up to date when the mouse leaves the canvas window
function handleMouseOut() {
    cursesCanvas.stopDrawing();
    cursesCanvas.turnOffSquareHighlighting();
    updateCanvas();
}

// turn on square highlighting for relevant tools
function handleMouseEnter() {
    let toolSelected = get(cursesCanvas).tool;
    if (toolSelected === tools.TEXT || toolSelected === tools.PROGRESS || toolSelected === tools.KEYBOARD) {
        cursesCanvas.turnOnSquareHighlighting();
    }
}

function handleKeyDown(event) {
    if (event.shiftKey && event.key === keyboardKeys.D) {
        duplicateObject();
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