import { cursesCanvas } from '../stores/store.js';
import { get } from 'svelte/store';
import { drawLine } from '../tools/line.js';
import { writeText, highlightSquare } from '../tools/text.js';
import { addTextToCanvas } from './updateCanvas.js';

// function to select which canvas tool has been clicked in the toolbar
function changeTool(buttonPressed) {
    cursesCanvas.changeCanvasTool(buttonPressed);
    let canvasElement = get(cursesCanvas).canvasElement;

    //change the mouse icon depending on what tool has been selected
    if (buttonPressed === "line") {
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
        clearCanvas();
        // draw a new line based on new mouse position
        drawLine();
    }

    // if text, highlight the grid square to enter text from
    if (toolSelected === 'text') {
        //stop highlighting/clearing the canvas once a location has been selected
        if (isDrawing) return;

        cursesCanvas.updateMousePosition(event, canvasElement);
        clearCanvas();
        highlightSquare();
    }
}

// if mouse button is released, canvas is no longer being drawn on
function handleMouseRelease() {
    cursesCanvas.stopDrawing();
}

// function to clear the canvas of preview animations and draw saved objects
function clearCanvas() {
    let context = get(cursesCanvas).context;
    const canvasElement = get(cursesCanvas).canvasElement;

    context.clearRect(0, 0, canvasElement.width, canvasElement.height);

    addTextToCanvas();
}


export { changeTool, handleMouseClick, handleMouseDown, handleMouseMove, handleMouseRelease }