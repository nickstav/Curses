import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/project.js';

import { tools } from '../constants/toolsList.js';
import { updateCanvas } from './updateCanvas.js';
import { getGridLocation } from './location.js';

import { TextItem } from '../items/textItem.js';


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
                let newTextItem = new TextItem(userText, gridLocation);
                newTextItem.draw();
            }
            break;
        case(tools.ERASE):
            //markSquareAsErased(event, canvasElement);
        case(tools.PROGRESS):
            //saveProgressBarToStore();
        case(tools.DRAG):
            //selectObject();    
    }
    //show updated canvas with any added/erased objects when clicking
    //updateCanvas();
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
            //drawLiveLine(event, isDrawing, canvasElement);
            break;
        case(tools.RECTANGLE):
            //drawLiveRectangle(event, isDrawing, canvasElement);
            break;
        case(tools.TEXT):
        case(tools.ERASE):
            if (isDrawing) {
                //cursesCanvas.updateMousePosition(event, canvasElement);
                //markSquareAsErased();
            } else {
                //showCurrentSquare(event, canvasElement);
            }
            break;
        case(tools.PROGRESS):
            //cursesCanvas.updateMousePosition(event, canvasElement);
            //previewProgressSize();
            break;
        case(tools.DRAG):
            //moveObject(event, isDrawing, canvasElement);
            break;
    };
}

// if mouse button is released, canvas is no longer being drawn on
function handleMouseRelease() {
    let toolSelected = get(cursesCanvas).tool;
    
    cursesCanvas.stopDrawing();

    switch(toolSelected) {
        case(tools.LINE):
            //saveLineToStore();
            break;
        case(tools.RECTANGLE):
            //saveRectangleToStore();
            break;
        case(tools.DRAG):
            //saveNewObject();
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