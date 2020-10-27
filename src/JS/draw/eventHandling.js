import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { updateCanvas } from './updateCanvas.js';
import { showCurrentSquare } from './location.js';
import { tools } from '../tools/toolsList.js';
import { drawLiveLine, saveLineToStore } from '../tools/line.js';
import { drawLiveRectangle, saveRectangleToStore } from '../tools/rectangle.js';
import { writeText } from '../tools/text.js';
import { previewProgressSize, saveProgressBarToStore } from '../tools/progress.js';
import { markSquareAsErased } from '../tools/erase.js';

function handleMouseClick(event) {
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;

    switch(toolSelected) {
        case(tools.TEXT):
            cursesCanvas.updateMousePosition(event, canvasElement);
            writeText();
            break;
        case(tools.ERASE):
            cursesCanvas.updateMousePosition(event, canvasElement);
            markSquareAsErased(event, canvasElement);
        case(tools.PROGRESS):
            cursesCanvas.updateMousePosition(event, canvasElement);
            saveProgressBarToStore();
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

    switch(toolSelected) {
        case(tools.LINE):
            drawLiveLine(event, isDrawing, canvasElement);
            break;
        case(tools.RECTANGLE):
            drawLiveRectangle(event, isDrawing, canvasElement);
            break;
        case(tools.TEXT):
        case(tools.ERASE):
            if (isDrawing) {
                cursesCanvas.updateMousePosition(event, canvasElement);
                markSquareAsErased();
            } else {
                showCurrentSquare(event, canvasElement);
            }
            break;
        case(tools.PROGRESS):
            cursesCanvas.updateMousePosition(event, canvasElement);
            previewProgressSize();
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