import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';

import { addLineToCanvas, addTextToCanvas, addRectanglesToCanvas } from './updateCanvas.js';
import { highlightSquare } from './location.js';

import { tools } from '../tools/toolsList.js';
import { drawLine, saveLineToStore } from '../tools/line.js';
import { writeText } from '../tools/text.js';
import { drawRectangle, saveRectangleToStore } from '../tools/rectangle.js';


// function to select which canvas tool has been clicked in the toolbar
function changeTool(buttonPressed) {
    cursesCanvas.changeCanvasTool(buttonPressed);

    let canvasElement = get(cursesCanvas).canvasElement;
    switch(buttonPressed) {
        case(tools.LINE):
        case(tools.RECTANGLE):
            canvasElement.style.cursor = "crosshair";
            break;
        case(tools.TEXT):
            canvasElement.style.cursor = "pointer";
            break;
        default:
            canvasElement.style.cursor = "default"; 
    }
}

function handleMouseClick(event) {
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;

    switch(toolSelected) {
        case(tools.TEXT):
            cursesCanvas.updateMousePosition(event, canvasElement);
            writeText();
            break;
    }
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

    switch(toolSelected) {
        case(tools.LINE):
            if (!isDrawing) return;
            // continually update the current mouse position
            cursesCanvas.updateMousePosition(event, canvasElement);
            // clear any prevously drawn lines from previous loop
            updateCanvas();
            // draw a new line based on new mouse position
            drawLine();
            break;
        case(tools.RECTANGLE):
            if (!isDrawing) return;
            cursesCanvas.updateMousePosition(event, canvasElement);
            updateCanvas();
            drawRectangle();
            break;
        case(tools.TEXT):
            //stop highlighting/clearing the canvas once a location has been selected
            if (isDrawing) return;

            cursesCanvas.updateMousePosition(event, canvasElement);
            updateCanvas();
            highlightSquare();
            break;
    };
}

// if mouse button is released, canvas is no longer being drawn on
function handleMouseRelease() {
    let toolSelected = get(cursesCanvas).tool;
    
    cursesCanvas.stopDrawing();

    switch(toolSelected) {
        case(tools.LINE):
            saveLineToStore();
            break;
        case(tools.RECTANGLE):
            saveRectangleToStore();
            break;

    }
}

function handleMouseOut() {
    updateCanvas();
}

// function to clear the canvas of preview animations and draw saved objects
function updateCanvas() {
    let context = get(cursesCanvas).context;
    const canvasElement = get(cursesCanvas).canvasElement;

    context.clearRect(0, 0, canvasElement.width, canvasElement.height);

    //loop through the saved objects in order, so most recent overlap older objects
    let objects = get(canvasObjects).numberOfObjects;
    for (let i = 1; i <= objects; i++) {
        addLineToCanvas(i);
        addTextToCanvas(i);
        addRectanglesToCanvas(i);
    }
}


export { changeTool, handleMouseClick, handleMouseDown, handleMouseMove, handleMouseRelease, handleMouseOut, updateCanvas }