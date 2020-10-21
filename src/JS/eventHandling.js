import { cursesCanvas } from './store.js';
import { get } from 'svelte/store';
import { drawLine } from './line.js';
import { writeText, highlightSquare } from './text.js';

// function to select which canvas tool has been clicked in the toolbar
function changeTool(buttonPressed) {
    cursesCanvas.changeCanvasTool(buttonPressed);
    let canvasElement = get(cursesCanvas).canvasElement;

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

    // if text tool is selected, carry out line drawing functions
    if (toolSelected === 'text') {
        cursesCanvas.updateMousePosition(event, canvasElement);
        writeText();
    }
}

// function to handle when the mouse button is pressed & held
function handleMouseDown(event) {
    // update the start position of the cursor when the mouse is first clicked
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
        // only run function if mouse button is pressed
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

// function to clear the entire canvas
function clearCanvas() {
    let context = get(cursesCanvas).context;
    const canvasElement = get(cursesCanvas).canvasElement;

    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
}


export { changeTool, handleMouseClick, handleMouseDown, handleMouseMove, handleMouseRelease }