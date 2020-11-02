import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';

import { tools } from '../constants/toolsList.js';
import { updateCanvas } from './updateCanvas.js';
import { selectObject, dragObject } from './drag.js';
import { eraseObject } from './erase.js';
import { getGridLocation, showCurrentSquare } from './location.js';

import { TextItem } from '../items/textItem.js';
import { canvasObjects } from '../stores/objects.js';



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
            //saveProgressBarToStore();
            break;
        case(tools.DRAG):
            selectObject(gridLocation);  
            break;  
        case(tools.ERASE):
            eraseObject(gridLocation);
            break;
    }
    //show updated canvas with any added/erased objects when clicking
    updateCanvas();
}

function handleMouseDown(event) {
    // update the start position of the cursor when the mouse is first pressed
    let canvasElement = get(cursesCanvas).canvasElement;
    cursesCanvas.updateStartPosition(event, canvasElement);

    // confirm that the canvas is being drawn on now the button is being held down
    cursesCanvas.startDrawing();
}

function handleMouseMove(event) {
    let isDrawing = get(cursesCanvas).isDrawing;
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;

    cursesCanvas.updateMousePosition(event, canvasElement);
    let mouseLocation = get(cursesCanvas).mousePosition;
    let gridLocation = getGridLocation(mouseLocation);

    switch(toolSelected) {
        case(tools.LINE):
            //drawLiveLine(event, isDrawing, canvasElement);
            break;
        case(tools.RECTANGLE):
            //drawLiveRectangle(event, isDrawing, canvasElement);
            break;
        case(tools.TEXT):
            showCurrentSquare(event, canvasElement);
            break;
        case(tools.PROGRESS):
            //cursesCanvas.updateMousePosition(event, canvasElement);
            //previewProgressSize();
            break;
        case(tools.DRAG):
            dragObject(isDrawing, gridLocation);
            updateCanvas();
            break;
    };
}

// if mouse button is released, canvas is no longer being drawn on
function handleMouseRelease() {
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;
    
    cursesCanvas.stopDrawing();

    switch(toolSelected) {
        case(tools.LINE):
            //saveLineToStore();
            break;
        case(tools.RECTANGLE):
            //saveRectangleToStore();
            break;
        case(tools.DRAG):
            canvasElement.style.cursor = "grab";
            break;
    }
}

// ensure canvas remains up to date when the mouse leaves the canvas window
function handleMouseOut() {
    updateCanvas();
}

export { 
    handleMouseClick, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseRelease, 
    handleMouseOut
}