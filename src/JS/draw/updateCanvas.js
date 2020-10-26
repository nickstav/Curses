import { get } from 'svelte/store';
import { cursesCanvas } from '../stores/store.js';
import { canvasObjects } from '../stores/objects.js';
import { createRectangle } from '../tools/rectangle.js';
import { writeTextToCanvas } from '../tools/text.js';
import { drawLineOnGrid } from '../tools/line.js';
import { eraseSquare } from '../tools/erase.js';

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
        eraseMarkedSquares(i);
    }
}

/* --------------------------------------------------------------------------------------------- */

//check for the current object number and draw it if it's a line
function addLineToCanvas(order) {
    let lineObjects = get(canvasObjects).lines;

    for (let i = 0; i < lineObjects.length; i++) {
        let line = lineObjects[i];
        if (line.order === order) {
            drawLineOnGrid(line.start.x, line.start.y, line.finish.x, line.finish.y);
        }
    }
}

//check for the current object number and draw it if it's a text object
function addTextToCanvas(order) {
    let textObjects = get(canvasObjects).text;

    for (let i = 0; i < textObjects.length; i++) {
        if (textObjects[i].order === order) {
            let text = textObjects[i].text;
            let location = textObjects[i].location;
            let newLine = textObjects[i].newLine;
            writeTextToCanvas(text, location, newLine);
        }
    }
}

//check for the current object number and draw it if it's a rectangle
function addRectanglesToCanvas(order) {
    let rectangleObjects = get(canvasObjects).rectangles;

    for (let i = 0; i < rectangleObjects.length; i++) {
        if (rectangleObjects[i].order === order) {
            let startSquare = rectangleObjects[i].startPoint;
            let endSquare = rectangleObjects[i].endPoint;
            createRectangle(startSquare, endSquare);
        }
    }
}

function eraseMarkedSquares(order) {
    let erasedSquares = get(canvasObjects).erasedSquares;

    for (let i = 0; i < erasedSquares.length; i++) {
        if (erasedSquares[i].order === order) {
            eraseSquare(erasedSquares[i].location);
        }
    }
}


export { updateCanvas }