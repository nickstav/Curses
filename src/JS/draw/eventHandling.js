import { cursesCanvas } from '../stores/store.js';
import { get } from 'svelte/store';
import { drawLine } from '../tools/line.js';
import { writeText } from '../tools/text.js';
import { highlightSquare } from './location.js';
import { addTextToCanvas, addRectanglesToCanvas } from './updateCanvas.js';
import { drawRectangle, saveRectangleToStore } from '../tools/rectangle.js';

// function to select which canvas tool has been clicked in the toolbar
function changeTool(buttonPressed) {
    cursesCanvas.changeCanvasTool(buttonPressed);

    let canvasElement = get(cursesCanvas).canvasElement;
    //change the mouse icon depending on what tool has been selected
    if (buttonPressed === "line" || buttonPressed === "rectangle") {
        canvasElement.style.cursor = "crosshair";
    } else if (buttonPressed === "text") {
        canvasElement.style.cursor = "pointer";
    } else {
        canvasElement.style.cursor = "default";
    }
}

function handleMouseClick(event) {
    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;

    // if text tool is selected, carry out text functions at clicked location
    if (toolSelected === 'text') {
        cursesCanvas.updateMousePosition(event, canvasElement);
        writeText();
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

    // if line tool is selected, carry out line drawing functions if button is pressed
    if (toolSelected === 'line') {
        // only run function if mouse button is being held down
        if (!isDrawing) return;
        // continually update the current mouse position
        cursesCanvas.updateMousePosition(event, canvasElement);
        // clear any prevously drawn lines from previous loop
        updateCanvas();
        // draw a new line based on new mouse position
        drawLine();
    }

    if (toolSelected === "rectangle") {
        if (!isDrawing) return;
        cursesCanvas.updateMousePosition(event, canvasElement);
        updateCanvas();
        drawRectangle();
    }

    // if text, highlight the grid square to enter text from
    if (toolSelected === 'text') {
        //stop highlighting/clearing the canvas once a location has been selected
        if (isDrawing) return;

        cursesCanvas.updateMousePosition(event, canvasElement);
        updateCanvas();
        highlightSquare();
    }
}

// if mouse button is released, canvas is no longer being drawn on
function handleMouseRelease() {
    let toolSelected = get(cursesCanvas).tool;
    
    cursesCanvas.stopDrawing();

    if (toolSelected === "rectangle") {
        saveRectangleToStore();
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

    addTextToCanvas();
    addRectanglesToCanvas();
}


export { changeTool, handleMouseClick, handleMouseDown, handleMouseMove, handleMouseRelease, handleMouseOut, updateCanvas }