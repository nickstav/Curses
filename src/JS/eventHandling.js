import { cursesCanvas } from './store.js';
import { get } from 'svelte/store';
import { drawLine } from './line.js';

// function to select which canvas tool has been clicked in the toolbar
function changeTool(buttonPressed) {
    cursesCanvas.changeCanvasTool(buttonPressed);
}

// function to handle when the mouse button is pressed & held
function handleMouseDown(event) {
    let isDrawing = get(cursesCanvas).isDrawing;
    let canvasElement = get(cursesCanvas).canvasElement;
    if (!isDrawing) {
        // update the start position of the cursor when the mouse is first clicked
        cursesCanvas.updateStartPosition(event, canvasElement);
    }
    // confirm that the canvas is being drawn on now the button is being held down
    cursesCanvas.startDrawing();
}

function handleMouseMove(event) {
    // only run function if mouse button is pressed
    let isDrawing = get(cursesCanvas).isDrawing;
    if (!isDrawing) return;

    let toolSelected = get(cursesCanvas).tool;
    let canvasElement = get(cursesCanvas).canvasElement;

    // if line tool is selected, carry out line drawing functions
    if (toolSelected === 'line') {
        // continually update the current mouse position
        cursesCanvas.updateMousePosition(event, canvasElement);
        // clear any prevously drawn lines from previous loop
        clearCanvas();
        // draw a new line based on new mouse position
        drawLine();
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


export { changeTool, handleMouseDown, handleMouseMove, handleMouseRelease }